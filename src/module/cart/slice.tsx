import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/slice';
import { GetUserCart, GetProductImage } from './api'

export class CartData {
    id?: String;//": 0,
    products?: Array<Product>;//" : "",
    total?: number;//": 2492,
    discountedTotal?: number;//": 2140,
    userId?: number;//": 5, // user id is 5
    totalProducts?: number;//": 5,
    totalQuantity?: number;//": 14
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
    async (userId: Number) => {
        console.log("call async cart");
        const response = await GetUserCart(userId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const getProductImageAsync = createAsyncThunk(
    'cart/getProductImageAsync',
    async (productId: Number) => {
        console.log("call async cart");
        const response = await GetProductImage(productId);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        changeQty: (state, action: PayloadAction<{ productId: number, count: number }>) => {

            state.data![0].products?.map((item) => {
                if (item.id === action.payload.productId) {
                    item.discountedPrice = (item.price! - (item.price! * item.discountPercentage! / 100)) * action.payload.count;
                    item.total = (item.price!) * action.payload.count;
                    item.quantity = action.payload.count;
                    countItem(state);
                    countAllItem(state);
                    countTotalPrice(state);
                    countTotalDiscountedPrice(state);
                }
            });

        },
        addProduct: (state, action: PayloadAction<Product>) => {

            var found = false;

            state.data![0].products?.map((item) => {
                if (item.id === action.payload.id) {
                    found = true;
                    item.deleted = false;
                    item.discountedPrice = (item.price! - (item.price! * item.discountPercentage! / 100)) * (item.quantity! + 1);
                    item.total = (item.price!) * (item.quantity! + 1);
                    item.quantity = (item.quantity! + 1);
                    countItem(state);
                    countAllItem(state);
                    countTotalPrice(state);
                    countTotalDiscountedPrice(state);
                }
            });

            if (found === false) {
                var jsonProduct = JSON.stringify(action.payload);
                var newProduct = JSON.parse(jsonProduct);
                state.data![0].products?.push(newProduct);
                state.data![0].totalProducts = state.data![0].products?.length;
                state.data![0].products?.map((item, i) => {
                    if (item.id === action.payload.id) {
                        item.discountedPrice = (item.price! - (item.price! * item.discountPercentage! / 100));
                        item.total = (item.price!);
                        item.quantity = (1);
                        countItem(state);
                        countAllItem(state);
                        countTotalPrice(state);
                        countTotalDiscountedPrice(state);
                    }
                });
            }

        },
        removeProduct: (state, action: PayloadAction<Product>) => {

            state.data![0].products?.map((item, i) => {
                if (item.id === action.payload.id) {
                    state.data![0].products!.splice(i,1);
                    countItem(state);
                    countAllItem(state);
                    countTotalPrice(state);
                    countTotalDiscountedPrice(state);
                }
            });

        },
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
            }).addCase(getProductImageAsync.pending, (state, action) => {
                state.data![0].products?.map((item, i) => {
                    if (item.id === action.meta.arg) {
                        item.images = Array<String>("");
                    }
                })
            })
            .addCase(getProductImageAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // Add any fetched posts to the array
                state.data![0].products?.map((item, i) => {
                    if (item.id === action.meta.arg) {
                        item.images = Array<String>(action.payload);
                    }
                })
            })
            .addCase(getProductImageAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
    },
});

export function countItem(state: cart): number {
    state.data![0].totalProducts = 0;

    state.data![0].products?.map((e, i) => {
        if (e.deleted !== true) {
            state.data![0].totalProducts = state.data![0].totalProducts! + 1;
        }
    })

    return state.data![0].totalProducts;
}

export function countAllItem(state: cart): number {
    state.data![0].totalQuantity = 0;

    state.data![0].products?.map((e, i) => {
        if (e.deleted !== true) {
            state.data![0].totalQuantity = state.data![0].totalQuantity! + e!.quantity! ?? 0;
        }
    })

    return state.data![0].totalQuantity;
}

export function countTotalPrice(state: cart): number {
    state.data![0].total = 0;

    state.data![0].products?.map((e, i) => {
        if (e.deleted !== true) {
            state.data![0].total = state.data![0].total! + e!.total! ?? 0;
        }
    })

    return state.data![0].total;
}

export function countTotalDiscountedPrice(state: cart): number {
    state.data![0].discountedTotal = 0;

    state.data![0].products?.map((e, i) => {
        if (e.deleted !== true) {
            state.data![0].discountedTotal = state.data![0].discountedTotal! + e!.discountedPrice! ?? 0;
        }
    })

    return state.data![0].discountedTotal;
}


export default CartSlice.reducer;



