import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../products/slice';

export class cart{
    product? : Product;
    count? : number;
}

export interface carts {
    datas: Array<cart>;
    status: 'first' | 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState : carts = {
    datas : Array(),
    status: 'first'
}



