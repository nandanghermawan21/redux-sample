import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './api';

export class Auth {
    id?: Number;  //": 15,
    username?: String;  //": "kminchelle",
    email?: String;  //": "kminchelle@qq.com",
    firstName?: String;  //": "Jeanne",
    lastName?: String;  //": "Halvorson",
    gender?: String;  //": "female",
    image?: String;  //": "https://robohash.org/autquiaut.png?size=50x50&set=set1",
    token?: String;  //": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
}

export interface AuthState {
    value: Auth | null;
    status: 'first' | 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState: AuthState = {
    value: null,
    status: 'first'
}

export const loginAsync = createAsyncThunk(
    'auth/login',
    async () => {
        console.log("call async login");
        const response = await login();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // Add any fetched posts to the array
                state.value = (action.payload);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'idle'
            })
    },
});

export default AuthSlice.reducer;