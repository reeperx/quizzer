import React from "react";
import Header from "../dashboard/_components/Header";

function PricingLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex justify-center mx-5 md:mx-20 lg:mx-36 mt-20 md:mt-20 lg:mt-20">
        {children}
      </div>
    </div>
  );
}

export default PricingLayout;
