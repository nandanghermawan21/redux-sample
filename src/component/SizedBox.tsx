import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

type SizedBoxProperty = {
  height: number,
  width: number,
}

export const SizedBox: FunctionComponent<SizedBoxProperty> = (prop) => {
  return (
    <div style={{height:prop.height, width:prop.width, display: "contents"}} />
  );
}

export default SizedBox;