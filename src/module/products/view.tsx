
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ProductsSlice, loadAsync, Product, Products } from './slice';
import { Instagram, } from 'react-content-loader'
import { Button, Col, Container, Row } from 'react-bootstrap';
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
                <Col md={7}>
                    <Row>
                        <label className={styles.priceLabel}>Category</label>
                    </Row>
                    <Row>
                        <label>{item.category}</label>
                    </Row>
                </Col>
                <Col md={5}>
                    <Row>
                        <Col md={1}>
                            <img className='float-right' src='star.png' alt='logo' width={20} height={20}></img>
                        </Col>
                        <Col>
                            <label>{item.rating}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                            <img src='box.png' alt='logo' width={20} height={20}></img>
                        </Col>
                        <Col>
                            <label>{item.stock}</label>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={styles.itemAction}>
                <Col md={7}>
                    <Row>
                        <label className={styles.priceLabel}>Price</label>
                    </Row>
                    <Row>
                        <label>USD {item.price}</label>
                    </Row>
                </Col>
                <Col md={5}>
                    <Button>
                        Add Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}


export default ProductGrid;