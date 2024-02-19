import React, { ReactNode } from "react";
import Header from "./Header";
import Devider from "./Devider";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Devider />
    <div className="layout">{props.children}</div>
  </div>
);

export default Layout;
