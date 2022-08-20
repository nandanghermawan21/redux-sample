import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAll } from './api';

export class Product {
    id?: number; //: 1,
    title?: String; //: "iPhone 9",
    description?: String; //: "An apple mobile which is nothing like apple",
    price?: number; //: 549,
    discountPercentage?: number; //: 12.96,
    rating?: number; //: 4.69,
    stock?: number; //: 94,
    brand?: String; //: "Apple",
    category?: String; //: "smartphones",
    thumbnail?: String; //: "...",
    images?: Array<String>; //: ["...", "...", "..."]
}

export interface Products {
    datas: Array<Product>;
    status: 'first' | 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState: Products = {
    datas: Array(),
    status: 'first'
};

export const loadAsync = createAsyncThunk(
    'product/loadAsync',
    async (category? : String) => {
        console.log("call async product");
        const response = await fetchAll(category);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);


export const ProductsSlice = createSlice({
    name: "producs",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(loadAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loadAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // Add any fetched posts to the array
                state.datas = (action.payload["products"]);
            })
            .addCase(loadAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
    },
});

export default ProductsSlice.reducer;
