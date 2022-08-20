import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { AppSlice } from './app/slice';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Tab, Tabs } from 'react-bootstrap';
import SizedBox from './component/SizedBox';
import { MinPrice } from './module/minprice/view';
import { MaxPrice } from './module/maxprice/view';
import { store } from './app/store';
import { CategoriesListCheckBox as CategoriesList } from './module/categories/view';
import ProductGrid from './module/products/view';
import { AuthMenuView } from './module/auth/view';
import { loadAsync as loadProductAsync } from './module/products/slice'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { CartBedgeView } from './module/cart/view';
import { loginAsync } from './module/auth/slice';
import { loadAsync as loadCategories } from './module/categories/slice';
import { loadAsync as loadProduct } from './module/products/slice';

function App() {
  const dispatch = useAppDispatch();

  //initstate
  dispatch(loginAsync());
  dispatch(loadCategories(()=>{
    dispatch(loadProduct());
  }));

  return (
    <Container >
      <Row>
        <Col lg="2" className='sized-dock'>
          <SideDock />
        </Col>
        <Col>
          <Row>
            <Header />
          </Row>
          <Row className='productArea'>
            <LoadTabContent />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function LoadTabContent() {
  const state = useAppSelector((state) => state.app);
  switch (state.activeTab) {
    case "product":
      return <ProductGrid />
    default:
      return (<div></div>)
  }
}

function Header() {
  return (
    <Container className='App-header d-flex align-items-end'>
      <Row style={{ width: "100%" }} className="align-items-center">
        <Col md={10}>
          <TabMenu />
        </Col>
        <Col md={2} className="align-items-end" style={{ textAlign: "end" }}>
          <div className='auth'>
            <AuthMenuView />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function SideDock() {
  const dispatch = useAppDispatch();
  return (
    <Container className='side-dock'>
      <Row>
        <Logo />
      </Row>
      <SizedBox height={20} width={0} />
      <Row className='subtitle'>
        Filter
      </Row>
      <SizedBox height={30} width={0} />
      <Row className='subtitle'>
        Categories
      </Row>
      <SizedBox height={20} width={0} />
      <Row>
        {CategoriesList('Radio', () => {
          const selectedCategories = store.getState().categories.selected;
          if (selectedCategories.length > 0) {
            dispatch(loadProductAsync(selectedCategories[0]));
          } else {
            dispatch(loadProductAsync());
          }
        })}
      </Row>
      <SizedBox height={20} width={0} />
      <Row className='subtitle'>
        Price Range
      </Row>
      <SizedBox height={20} width={0} />
      <Row>
        Minimum
      </Row>
      <Row>
        <MinPrice />
      </Row>
      <SizedBox height={10} width={0} />
      <Row>
        Maximum
      </Row>
      <Row>
        <MaxPrice />
      </Row>
    </Container>
  );
}

function TabMenu() {
  const dispatch = useAppDispatch();
  const [key, setKey] = useState('product');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        console.log("change tab");
        dispatch(AppSlice.actions.changeTab(k ?? "product"));
        setKey(k ?? "product");
      }}
      className="tab-menu"
      color='none'
      aria-checked="false"
    >
      <Tab eventKey="product" title="Product">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="cart" title={<React.Fragment>
        Cart
        <CartBedgeView />
      </React.Fragment>}>
      </Tab>
    </Tabs>
  );
}

function Logo() {
  return (
    <img src='/pintap-logo.png' alt='logo'></img>
  );
}


export default App;
