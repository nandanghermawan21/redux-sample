import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CheckBoxBasic, { RadioButtonBasic } from '../../component/Selector';
import { Categories, categoriesSlice, isSelected, loadAsync } from './slice';
import { BulletList } from 'react-content-loader'



export function CategoriesListCheckBox(type: 'CheckBox' | "Radio") {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.categories);


    switch (state.status) {
        case 'first':
            dispatch(loadAsync());
            return (LoadingView());
        case "idle":
            if (type == 'CheckBox') {
                return (CheckboxView(state, dispatch));
            }else{
                return (RadioButtonView(state, dispatch));
            }
        case "loading":
            return (LoadingView());
        default:
            return (<div></div>)
    }
}

const CheckboxView = (state: Categories, dispatch: any) => {
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

const RadioButtonView = (state: Categories, dispatch: any) => {
    return (
        <div>
            <div style={{ padding: 0 }}>
                {state.datas.map((pet, i) => {
                    return (
                        <RadioButtonBasic
                            name={"category"}
                            key={i}
                            id={pet}
                            label={pet}
                            checked={isSelected(state, pet)}
                            onChange={(val: boolean) => {
                                dispatch(categoriesSlice.actions.selectOne(pet));
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
                <BulletList />
            </div>
        </div>
    );
}


export default CategoriesListCheckBox;