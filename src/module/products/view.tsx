import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ProductsSlice, loadAsync, Products, Product } from './slice';
import { Instagram, } from 'react-content-loader'
import { Container, Row } from 'react-bootstrap';
import styles from './product.module.css';

export function ProductGrid() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.products);

    // return (LoadingView());

    switch (state.status) {
        case 'first':
            dispatch(loadAsync());
            return (LoadingView());
        case "idle":
            return (IdleView(state, dispatch));
        case "loading":
            return (LoadingView());
        default:
            return (<div></div>)
    }
}

const IdleView = (state: Products, dispatch: any) => {
    return (
        <div style={{ display: "contents" }}>
            {state.datas.map((product, i) => {
                return (
                    <div key={i}>{ProductItem(product)}</div>
                );
            })
            }
        </div>
    );
}

const LoadingView = () => {
    return (
        <div style={{ height: 500, width: 300 }}>
            <div style={{ padding: 0 }}>
                <Instagram />
            </div>
        </div>
    );
}

const ProductItem = (item: Product) => {
    return (
        <Container className={styles.container}>
            <Row className={styles.itemImage}>
                <img src={item.images != undefined ? item.images[0].toString() : ""} alt='logo'></img>
            </Row>
            <Row className={styles.itemName}>
                <label>{item.title}</label>
            </Row>
            <Row className={styles.itemRating}>
                test
            </Row>
            <Row className={styles.itemAction}>
                test
            </Row>
        </Container>
    );
}

export default ProductGrid;