import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Categories {
    datas: Array<String>;
    selected: Array<String>;
    status: 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState: Categories = {
   datas: Array(
    "laptops",
    "fragrances",
    "skincare",
   ),
   selected: Array(),
   status: 'idle'
  };

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    dummy: (state) =>{
      state.datas = Array(
        "laptops",
        "fragrances",
        "skincare",
      );
    },
    toggle: (state, action: PayloadAction<String>) => {
      const index = state.selected.indexOf(action.payload, 0);
      if(index > -1){
        state.selected.slice(index,0);
      }else{
        state.selected.push(action.payload);
      }
    }
  },
  extraReducers: {},
});

export default categoriesSlice.reducer;
