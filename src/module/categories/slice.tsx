import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAll } from './api'

export interface Categories {
  datas: Array<String>;
  selected: Array<String>;
  status: 'first' | 'idle' | 'loading' | 'sucess' | 'failed';
}

const initialState: Categories = {
  datas: Array<String>(
    "laptops",
    "fragrances",
    "skincare",
  ),
  selected: Array<String>(),
  status: 'first'
};

export const loadAsync = createAsyncThunk(
  'categories/loadAsync',
  async (onLoaded?: CallableFunction) => {
    console.log("call async");
    const response = await fetchAll(onLoaded);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    dummy: (state) => {
      state.datas = Array<String>(
        "laptops",
        "fragrances",
        "skincare",
        "cofee",
        "computer",
        "software",
      );
      state.status = "idle";
    },
    selectOne: (state, action: PayloadAction<String>) => {
      state.selected = Array<String>();
      state.selected.push(action.payload);
    },
    unSelectAll: (state) => {
      state.selected = Array<String>();
    },
    select: (state, action: PayloadAction<String>) => {
      const index = state.selected.indexOf(action.payload, 0);
      if (index > -1) {
        state.selected.slice(index, 0);
      } else {
        state.selected.push(action.payload);
      }
    },
    unSelect: (state, action: PayloadAction<String>) => {
      const index = state.selected.indexOf(action.payload, 0);
      if (index > -1) {
        state.selected.slice(index, 0);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loadAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Add any fetched posts to the array
        state.datas = (action.payload);
      })
      .addCase(loadAsync.rejected, (state, action) => {
        state.status = 'idle'
      })
  },
});

export function isSelected(state: Categories, category: String): boolean {
  const index = state.selected.indexOf(category);
  if (index > -1) {
    return true;
  } else {
    return false;
  }
}

export default categoriesSlice.reducer;
