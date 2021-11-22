import React from "react";
import { Link } from "react-router-dom";
import Styles from "./NavigationStyles";

function Navigation() {
  return (
    <Styles>
      <Link to="/">Toggle(useState)</Link>
      <Link to="/hooks">Hooks</Link>
      <Link to="/antd">Ant Design</Link>
      <Link to="/class-component">Class Component</Link>
      <Link to="/function-component">Function Component</Link>
    </Styles>
  );
}

export default Navigation;