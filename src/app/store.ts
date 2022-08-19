import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import minPriceReducer from '../module/minprice/slice';
import maxPriceReducer from '../module/maxprice/slice';
import categoriesReducer from '../module/categories/slice';
import products from '../module/products/slice';


export const store = configureStore({
  reducer: {
    minPrice: minPriceReducer,
    maxPrice: maxPriceReducer,
    categories: categoriesReducer,
    products: products
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
