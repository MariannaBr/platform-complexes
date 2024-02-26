import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="max-h-screen">
    <div>{props.children}</div>
  </div>
);

export default Layout;
