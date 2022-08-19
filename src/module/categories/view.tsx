import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CheckBoxBasic from '../../component/CheckBox';
import { Categories, categoriesSlice, isSelected, loadAsync } from './slice';
import { BulletList } from 'react-content-loader'


export function CategoriesListCheckBox() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.categories);


    switch (state.status) {
        case 'first':
            dispatch(loadAsync());
            return  (LoadingView());
        case "idle":
            return (IdleView(state, dispatch));
        case "loading":
            return (LoadingView());
        default:
            return (<div></div>)
    }
}

const IdleView = (state: Categories, dispatch: any) => {
    return (
        <div>
            <div style={{ padding: 0 }}>
                {state.datas.map((pet, i) => {
                    return (
                        <CheckBoxBasic
                            key={i}
                            id={pet}
                            label={pet}
                            checked={isSelected(state, pet)}
                            onChange={(val: boolean) => {
                                if (val == true) {
                                    dispatch(categoriesSlice.actions.select(pet));
                                } else {
                                    dispatch(categoriesSlice.actions.unSelect(pet));
                                }
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
}
const LoadingView = () => {
    return (
        <div>
            <div style={{ padding: 0 }}>
                <BulletList/>
            </div>
        </div>
    );
}


export default CategoriesListCheckBox;