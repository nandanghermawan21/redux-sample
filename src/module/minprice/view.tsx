import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { counterSlice } from './slice';
import Counter from '../../component/counter/Counter';

export function MinPrice() {
  const dispatch = useAppDispatch();

  return (
    <Counter
      onDecrement={() => dispatch(counterSlice.actions.decrement())}
      onIncrement={() => dispatch(counterSlice.actions.increment())}
      value={useAppSelector((state) => state.minPrice.value)}
      onChange={(val : number) => dispatch(counterSlice.actions.setValue(val ?? 0))}
    />
  );
}
