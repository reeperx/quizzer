import React from "react";
import Header from "../dashboard/_components/Header";

function QuestionsLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36 mt-20 md:mt-30 lg:mt-30">
        {children}
      </div>
    </div>
  );
}

export default QuestionsLayout;
