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
    select: (state, action: PayloadAction<String>) => {
      const index = state.selected.indexOf(action.payload, 0);
      if(index > -1){
        state.selected.slice(index,0);
      }else{
        state.selected.push(action.payload);
      }
    },
    unSelect: (state, action: PayloadAction<String>) => {
      const index = state.selected.indexOf(action.payload, 0);
      if(index > -1){
        state.selected.slice(index,0);
      }
    }
  },
  extraReducers: {},
});

export function isSelected(state : Categories, category : String) : boolean {
  const index = state.selected.indexOf(category);
  if(index > -1){
    return true;
  }else{
    return false;
  }
}

export default categoriesSlice.reducer;
