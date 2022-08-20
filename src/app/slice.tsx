import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface App {
    activeTab: String,
}

const initialState: App = {
    activeTab: "product",
};

export const AppSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        changeTab: (state, action: PayloadAction<String>) => {
            state.activeTab = action.payload
        },
    }
});

export default AppSlice.reducer;