import React from "react";

const ScrollLink = ({ to, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector(to)?.scrollIntoView({ behavior: "smooth" });
    console.log("scrolling to element", to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default ScrollLink;
