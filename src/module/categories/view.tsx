import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CheckBoxBasic, { RadioButtonBasic } from '../../component/Selector';
import { Categories, categoriesSlice, isSelected, loadAsync } from './slice';
import { BulletList } from 'react-content-loader'
import { NoParamCallback } from 'fs';



export function CategoriesListCheckBox(type: 'CheckBox' | "Radio", onChange: CallableFunction) {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.categories);


    switch (state.status) {
        case 'first':
            dispatch(loadAsync());
            return (LoadingView());
        case "idle":
            if (type == 'CheckBox') {
                return (CheckboxView(state, dispatch, onChange));
            } else {
                return (RadioButtonView(state, dispatch, onChange));
            }
        case "loading":
            return (LoadingView());
        default:
            return (<div></div>)
    }
}

const CheckboxView = (state: Categories, dispatch: any, onChange: CallableFunction) => {
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
                                onChange();
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
}

const RadioButtonView = (state: Categories, dispatch: any, onChange: CallableFunction) => {
    var datas = Array<String>();

    datas.push("all");

    state.datas.map((pet, i) => datas.push(pet));

    return (
        <div>
            <div style={{ padding: 0 }}>
                {datas.map((pet, i) => {
                    return (
                        <RadioButtonBasic
                            name={"category"}
                            key={i}
                            id={pet}
                            label={pet}
                            checked={state.selected.length < 1 && pet == "all" ? true : isSelected(state, pet)}
                            onChange={(val: boolean) => {
                                if (pet != "all") {
                                    dispatch(categoriesSlice.actions.selectOne(pet));
                                } else {
                                    dispatch(categoriesSlice.actions.selectOne(pet));
                                }
                                onChange();
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