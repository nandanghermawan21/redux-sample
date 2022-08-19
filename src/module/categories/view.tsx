import { useAppSelector, useAppDispatch } from '../../app/hooks';
import CheckBoxBasic from '../../component/CheckBox';
import { categoriesSlice } from './slice';


export function CategoriesListCheckBox() {
    const dispatch = useAppDispatch();
    const datas = useAppSelector((state) => state.categories.datas);
    // dispatch(categoriesSlice.actions.dummy())

    return (
        <div></div>
        // <FlatList
        //     data={datas}
        //     renderItem={(item: String) => <CheckBoxBasic value={item} label={item} />}
        //     keyExtractor={(item: any) => item}
        // />
    );
}