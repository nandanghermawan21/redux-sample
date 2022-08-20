
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loadAsync, Product, Products } from './slice';
import { Instagram, } from 'react-content-loader'
import { Button, Col, Container, FloatingLabel, Row } from 'react-bootstrap';
import styles from './product.module.css';
import { RefCallback } from 'react';
import { CartSlice } from '../cart/slice';


export function ProductGrid() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.products);

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
                    <div key={i}>{ProductItem(product, dispatch)}</div>
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

const ProductItem = (item: Product, dispatch: any) => {
    return (
        <Container className={styles.container}>
            <Row className={styles.itemImage}>
                <img src={item.images !== undefined ? item.images[0].toString() : ""} alt='image'></img>
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
            <Row className={styles.itemAction+"  d-flex align-items-end"}>
                <Col md={7}>
                    <Row>
                        <label className={styles.priceLabel}>Price</label>
                    </Row>
                    <Row>
                        <label>USD {(item.price! - (item.price! * item.discountPercentage! / 100))!.toLocaleString('en-US')}</label>
                    </Row>
                    <Row>
                        <label style={{textDecoration:"line-through"}}>USD {item.price!.toLocaleString('en-US')}</label>
                    </Row>
                </Col>
                <Col md={5}>
                    <Button onClick={(val) => {
                        dispatch(CartSlice.actions.addProduct(item))
                    }}>
                        Add Cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}


export default ProductGrid;