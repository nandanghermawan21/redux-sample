import { ListGroup } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CheckBoxBasic from '../../component/CheckBox';
import { categoriesSlice, isSelected } from './slice';

export function CategoriesListCheckBox() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.categories);
    // dispatch(categoriesSlice.actions.dummy())


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
                                console.log("changeTo:"+val)
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