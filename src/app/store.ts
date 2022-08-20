import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './slice';
import minPriceReducer from '../module/minprice/slice';
import maxPriceReducer from '../module/maxprice/slice';
import categoriesReducer from '../module/categories/slice';
import products from '../module/products/slice';
import auth from '../module/auth/slice';
import cart from '../module/cart/slice';


export const store = configureStore({
  reducer: {
    app: appReducer,
    minPrice: minPriceReducer,
    maxPrice: maxPriceReducer,
    categories: categoriesReducer,
    products: products,
    auth: auth,
    cart: cart,
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
