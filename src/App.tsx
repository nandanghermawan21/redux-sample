import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Form, Tab, Tabs } from 'react-bootstrap';
import SizedBox from './component/SizedBox';
import { MinPrice } from './module/minprice/view';
import { MaxPrice } from './module/maxprice/view';
import { store } from './app/store';
import { Unsubscribe } from '@reduxjs/toolkit';
import { CategoriesListCheckBox as CategoriesList } from './module/categories/view';
import ProductGrid from './module/products/view';
import { AuthMenuView } from './module/auth/view';
import { loadAsync as loadProductAsync } from './module/products/slice'
import { useAppDispatch } from './app/hooks';

function App() {
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
            <ProductGrid />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function Header() {
  return (
    <Container className='App-header d-flex align-items-end'>
      <Row style={{ width: "100%" }} className="align-items-center">
        <Col md={9}>
          <TabMenu />
        </Col>
        <Col md={3} className="align-items-end" style={{ textAlign: "end" }}>
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
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k ?? "Home")}
      className="tab-menu"
      color='none'
      aria-checked="false"
    >
      <Tab eventKey="home" title="Product">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="profile" title="Cart">
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>
  );
}

function Logo() {
  return (
    <img src='/pintap-logo.png' alt='logo'></img>
  );
}

function CheckExample() {
  return (
    <Form>
      {['checkbox'].map((type) => (
        <div key={type} className="mb-2">
          <Form.Check type={"checkbox"} id={`check-api-${type}`}>
            <Form.Check.Input type={"checkbox"} />
            <Form.Check.Label>{`Category 1`}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
}

export default App;
