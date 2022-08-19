import { FunctionComponent, RefCallback } from "react";
import { Row, Col } from "react-bootstrap";
import styles from './Counter.module.css';
import Form from 'react-bootstrap/Form';
import { debug } from "console";
import { ParseNumber } from "../../helper/number";

type CounterProperty = {
  onIncrement: React.MouseEventHandler<HTMLButtonElement>,
  onDecrement: React.MouseEventHandler<HTMLButtonElement>,
  value : number,
  onChange: RefCallback<number>
}

export const Counter: FunctionComponent<CounterProperty> = (prop) => {
  return (
    <Row className={styles.row}>
      <Col xs="2" className={styles.col}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={prop.onDecrement}
        >
          -
        </button>
      </Col>
      <Col className={styles.value}>
        <span ><Form.Control as="input" className={styles.input} value={prop.value} onChange={(val) => prop.onChange(ParseNumber(val.target.value, prop.value))}/></span>
      </Col>
      <Col xs="2" className={styles.col}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={prop.onIncrement}
        >
          +
        </button>
      </Col>
    </Row>
  );
}

export default Counter;