import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { cart, CartSlice } from './slice';

export function CartBedgeView() {
    const state = useAppSelector((state) => state.cart);
    switch (state.status) {
        case 'loading':
            return (<BedgeLoading />);
        default:
            return (<div></div>)
    }
}

const BedgeLoading = () => {
    return <img src="/circular_loading.gif" alt="loading" height={20} width={20} />
}