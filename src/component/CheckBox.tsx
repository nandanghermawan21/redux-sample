import { FunctionComponent, RefCallback } from "react";
import { Form } from "react-bootstrap";

type CheckBoxProperty = {
    value: any,
    label: String
  }

export const CheckBoxBasic: FunctionComponent<CheckBoxProperty> = (prop) => {
    return (
        <div >
            {/* <Form.Check type={"checkbox"} id={prop.value}>
                <Form.Check.Input type={"checkbox"} />
                <Form.Check.Label>{prop.label}</Form.Check.Label>
            </Form.Check> */}
        </div>
    );
  }

export default CheckBoxBasic;
