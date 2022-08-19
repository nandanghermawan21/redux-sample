import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Form, Tab, Tabs } from 'react-bootstrap';
import SizedBox from './component/SizedBox';
import { MinPrice } from './module/minprice/view';
import { MaxPrice } from './module/maxprice/view';
import {store} from './app/store';
import { Unsubscribe } from '@reduxjs/toolkit';
import { CategoriesListCheckBox } from './module/categories/view';

function App() {
  return (
    <Container >
      <Row>
        <Col lg="2">
          <SideDock/>
        </Col>
        <Col>
          <Header />
        </Col>
      </Row>
    </Container>
  );
}

function Header() {
  return (
    <Container className='App-header d-flex align-items-end'>
      <Row>
        <Col>
          <TabMenu />
        </Col>
      </Row>
    </Container>
  );
}

function SideDock() {
  return (
    <Container className='side-dock'>
      <Row>
       <Logo/>
      </Row>
      <SizedBox height={20} width={0}/>
      <Row className='subtitle'>
        Filter
      </Row>
      <SizedBox height={30} width={0}/>
      <Row className='subtitle'>
        Categories
      </Row>
      <SizedBox height={20} width={0}/>
      <Row>
        <CategoriesListCheckBox/>
      </Row>
      <SizedBox height={20} width={0}/>
      <Row  className='subtitle'>
        Price Range
      </Row>
      <SizedBox height={20} width={0}/>
      <Row>
        Minimum
      </Row>
      <Row>
        <MinPrice/>
      </Row>
      <SizedBox height={10} width={0}/>
      <Row>
        Maximum
      </Row>
      <Row>
        <MaxPrice/>
      </Row>
    </Container>
  );
}

export function readMaxprice(): Unsubscribe {
  return store.subscribe(() => {
    return store.getState().maxPrice.value;
  });
} 

function TabMenu() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k ?? "Home") }
      className="tab-menu"
      color='none'
      aria-checked="false"
    >
      <Tab eventKey="home" title="Home">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="profile" title="Profile">
        {/* <Sonnet /> */}
      </Tab>
      <Tab eventKey="contact" title="Contact">
        {/* <Sonnet /> */}
      </Tab>
    </Tabs>
  );
}

function Logo(){
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
            <Form.Check.Input type={"checkbox"}  />
            <Form.Check.Label>{`Category 1`}</Form.Check.Label>
          </Form.Check>
        </div>
      ))}
    </Form>
  );
}

export default App;
