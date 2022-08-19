import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  counterSlice,
} from './slice';
import Counter from '../../component/counter/Counter';

export function MaxPrice() {
  const count = useAppSelector((state) => state.maxPrice.value);
  const dispatch = useAppDispatch();


  return (
    <Counter 
      onDecrement={() => dispatch(counterSlice.actions.decrement())}
      onIncrement={() =>  dispatch(counterSlice.actions.maxPriceIncrement())}
      value={count}
      onChange={(val) => dispatch(counterSlice.actions.setValue(val ?? 0))}
    />
  );
}
