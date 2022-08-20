import { stat } from 'fs';
import React from 'react';
import { RefCallback, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Counter from '../../component/counter/Counter';
import { Product } from '../products/slice';
import styles from './cart.module.css';
import { cart, CartSlice, countAllItem, getProductImageAsync } from './slice';

export function CartBedgeView() {
    const state = useAppSelector((state) => state.cart);
    switch (state.status) {
        case 'loading':
            return (<BedgeLoading />);
        case 'idle':
            return (<Badge style={{ marginLeft: 10 }} >{state.data![0]!.totalQuantity}</Badge>);
        default:
            return (<div></div>)
    }
}

export function CartDetailView() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.cart);
    switch (state.status) {
        case 'idle':
            return (CartDetail(state, dispatch));
        default:
            return (<div></div>)
    }
}

const CartDetail = (state: cart, dispatch: any) => {
    return (
        <Row>
            <Col md={8}>
                {ProductItems(state.data![0]!.products!, dispatch)}
            </Col>
            <Col md={4}>
                {CartSummay(state)}
            </Col>
        </Row>
    );
}

const CartSummay = (state: cart) => {
    return (
        <div className={styles.SummaryContainer}>
            <Row className={styles.SummaryTitle}>
                <label>Summary</label>
            </Row>
            <Row className={styles.SummaryDetail}>
                <Col className={styles.SummaryDetailLabel}>
                    Total Product
                </Col>
                <Col className={styles.SummaryDetailValue}>
                    {state!.data![0]!.totalProducts}
                </Col>
            </Row>
            <Row className={styles.SummaryDetail}>
                <Col className={styles.SummaryDetailLabel}>
                    Total Item
                </Col>
                <Col className={styles.SummaryDetailValue}>
                    {state!.data![0]!.totalQuantity}
                </Col>
            </Row>
            <Row className={styles.SummaryDetail}>
                <Col className={styles.SummaryDetailLabel}>
                    Total Price
                </Col>
                <Col className={styles.SummaryDetailValue}>
                    USD {state!.data![0]!.total!.toLocaleString('en-US')}
                </Col>
            </Row>
            <Row className={styles.SummaryDetail}>
                <Col className={styles.SummaryDetailLabel}>
                    Total Discont
                </Col>
                <Col className={styles.SummaryDetailValue}>
                    USD {((state!.data![0]!.total!) - (state!.data![0]!.discountedTotal)!).toLocaleString('en-US')}
                </Col>
            </Row>
            <Row className={styles.SummaryDetailTotalContainer + "  d-flex align-items-end"}>
                <Row style={{ marginTop: "35px" }}>
                    <Col className={styles.SummaryDetailLabel}>
                        Total Price
                    </Col>
                    <Col className={styles.SummaryDetailValue}>
                        USD {(state!.data![0]!.discountedTotal!.toLocaleString('en-US'))!}
                    </Col>
                </Row>
                <Button>Checkout</Button>
            </Row>
        </div >
    );
}

const ProductItems = (items: Array<Product>, dispatch: any) => {
    return (<div className={styles.ProductItemContainer}>
        {items.map((item, i) => {
            return (<Container key={i} className={styles.ProductItem} style={{ display: item.deleted == true ? "none" : "" }}>
                <div className={styles.ProductImageContainer + " d-flex align-items-center"}>
                    {ProductImage(item!, dispatch)}
                </div>
                <div className={styles.ProductDetailContainer}>
                    <div>
                        <label className={styles.ProductDetailTitle}>{item.title}</label>
                    </div>
                    <div>
                        <label className={styles.ProductDetailPriceNormal}>USD {item.discountedPrice?.toLocaleString('en-US')}</label>
                        &nbsp;&nbsp;
                        <label className={styles.ProductDetailPrice}>USD {(item.total!)?.toLocaleString('en-US')}</label>
                    </div>
                    <div >
                        <Row>
                            <Col>
                                <div style={{ width: "150px" }}>
                                    {QuantityCounter(item.quantity ?? 0, (v) => {
                                        dispatch(CartSlice.actions.changeQty({ productId: item.id ?? 0, count: v ?? 0 }));
                                    })}
                                </div>
                            </Col>
                            <Col style={{ textAlign: "end" }}>
                                <Button className={styles.DeleteButton + " btn-error"} onClick={(val) => {
                                    dispatch(CartSlice.actions.removeProduct(item!));
                                }}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>);
        })}
    </div>);
};


const ProductImage = (data: Product, dispatch: any) => {
    // const [key, setKey] = useState('');

    // if (key == "") {
    // fetchOne(id, (data) => {
    //     // setKey(data!.images![0]!.toString());
    // });
    // }

    if (data!.images != null && data!.images!.length > 0) {
        return (
            <img alt='product' src={data!.images![0]! != "" ? data!.images![0]!.toString() : "/circular_loading.gif"}></img>
        );
    } else {
        dispatch(getProductImageAsync(data.id ?? 0));
        return <img alt='product' src={"/circular_loading.gif"}></img>
    }

}

function QuantityCounter(count: number, onChange: RefCallback<number>) {


    return (
        <Counter
            onChange={(v) => {
                onChange(v ?? count);
            }}
            value={count}
            onIncrement={() => {
                onChange(count + 1);
            }}
            onDecrement={() => {
                if (count - 1 > 0) {
                    onChange(count - 1);
                }
            }}
        />
    );
}

const BedgeLoading = () => {
    return <img src="/circular_loading.gif" alt="loading" height={20} width={20} />
}