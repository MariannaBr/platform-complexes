import React, { ReactNode, useState } from "react";
import CallToActionPopup from "./CallToActionPopup";
import CallToActionPopupSucess from "./CallToActionPopupSucess";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleFormSubmit = () => {
    setIsSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="max-h-screen">
      <div>{props.children}</div>
      <CallToActionPopup onSubmit={handleFormSubmit} />
      <CallToActionPopupSucess
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
};

export default Layout;
