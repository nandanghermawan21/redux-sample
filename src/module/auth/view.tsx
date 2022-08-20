import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { AuthState, AuthSlice, loginAsync } from './slice';
import { Code } from 'react-content-loader'
import SizedBox from '../../component/SizedBox';



export function AuthMenuView() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.auth);

    switch (state.status) {
        case 'first':
            dispatch(loginAsync());
            return (LoadingView());
        case "idle":
            return (IdleView(state, dispatch));
        case "loading":
            return (LoadingView());
        default:
            return (<div></div>)
    }
}

const IdleView = (state: AuthState, dispatch: any) => {
    return (
        <div>
            <div style={{ padding: 0 }}>
               <label>{state.value != null ? state.value.username : ""}</label>
               <SizedBox height={0} width={30} />
               <img height={30} width={30} src={(state.value?.image ?? "").toString()}></img>
            </div>
        </div>
    );
}

const LoadingView = () => {
    return (
        <div>
            <div style={{ padding: 0 }}>
                <Code />
            </div>
        </div>
    );
}