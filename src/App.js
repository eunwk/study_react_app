import { HashRouter, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Styles from "./AppStyles";
import "./assets/css/common.css";
import Home from "./pages/Home";
import Hooks from "./pages/Hooks";
import Antd from "./pages/Antd";
import ClassComponent from "./pages/ClassComponent";
import FunctionComponent from "./pages/FunctionComponent";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <Styles>
      <HashRouter>
        <Navigation />
        <Route path="/" exact={true} component={Home} />
        <Route path="/hooks" component={Hooks} />
        <Route path="/antd" component={Antd} />
        <Route path="/class-component" component={ClassComponent} />
        <Route path="/function-component" component={FunctionComponent} />
      </HashRouter>
    </Styles>
  );
}

export default App;
