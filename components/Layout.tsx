import React, { ReactNode } from "react";
import Header from "./Header";
import Devider from "./Devider";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <Devider />
    <div className="layout">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
