import { FunctionComponent, RefCallback } from "react";
import { Form } from "react-bootstrap";


type CheckBoxProperty = {
  id: any,
  label: String,
  checked: boolean,
  onChange: RefCallback<boolean>
}

type RadioButtonProperty = {
  id: any,
  label: String,
  checked: boolean,
  name: String,
  onChange: RefCallback<boolean>
}

export const CheckBoxBasic: FunctionComponent<CheckBoxProperty> = (prop) => {
  return (
    <Form.Group className="mb-1" controlId={prop.id}>
      <Form.Check 
        type="checkbox" 
        label={prop.label} 
        defaultChecked={prop.checked} 
        onChange={(val) => prop.onChange((val.target.checked))}/>
    </Form.Group>
  );
}

export const RadioButtonBasic: FunctionComponent<RadioButtonProperty> = (prop) => {
  return (
    <Form.Group className="mb-1" controlId={prop.id}>
      <Form.Check 
        type="radio" 
        name={prop.name.toString()}
        label={prop.label} 
        defaultChecked={prop.checked} 
        onChange={(val) => prop.onChange((val.target.checked))}/>
    </Form.Group>
  );
}

export default CheckBoxBasic;
