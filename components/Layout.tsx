import React, { ReactNode } from "react";
import CallToActionPopup from "./CallToActionPopup";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="max-h-screen">
    <div>{props.children}</div>
    <CallToActionPopup />
  </div>
);

export default Layout;
