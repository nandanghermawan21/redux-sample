import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../products/slice';
import {getUserCart} from './api'

export class CartData{
    id?: String;//": 0,
    products?: Array<Product>;//" : "",
    total?: String;//": 2492,
    discountedTotal?: String;//": 2140,
    userId?: String;//": 5, // user id is 5
    totalProducts?: String;//": 5,
    totalQuantity?: String;//": 14
}

export interface cart {
    data?: Array<CartData>,
    status: 'first' | 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState: cart = {
    status: 'loading'
}

export const getUserCartAsync = createAsyncThunk(
    'cart/laodAsync',
    async (userId: number) => {
        console.log("call async product");
        const response = await getUserCart(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getUserCartAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getUserCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // Add any fetched posts to the array
                state.data = (action.payload["carts"]);
            })
            .addCase(getUserCartAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
    },
});

export default CartSlice.reducer;



