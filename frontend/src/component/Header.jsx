import React from "react";

const Header = ({ children }) => {
  return (
    <header className="flex flex-col lg:flex-row justify-between pl-3 lg:pl-6 3xl:pl-8 pr-3 pt-3 pb-5 sm:py-3">
      <h3 className="text-[26px] grow font-switzerMedium text-primary">
        {children}
      </h3>
    </header>
  );
};

export default Header;
