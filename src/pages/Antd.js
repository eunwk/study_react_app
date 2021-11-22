/*Antd.js*/


import React from "react";
import { Button } from "antd";
import Styles from "./AntdStyles";

function Antd() {
  return (
    <Styles>
      <h1>Ant Design</h1>
      <div>
        <h2>Buttons</h2>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br />
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
    </Styles>
  );
}
export default Antd;