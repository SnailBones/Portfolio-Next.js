"use client";

import { useState } from "react";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function Title() {
  const [isRealName, setIsRealName] = useState(false);
  // document.body.style.overflow = isRealName ? "unset" : "hidden";

  function evolve() {
    if (!isRealName) {
      setTimeout(() => {
        smoothScrollTo("#portfolio", 2000);
      }, 1000);
    } else {
      smoothScrollTo(".background", 2000);
    }
    setIsRealName(!isRealName);
  }

  return (
    <div className="screen-space">
      <h1
        className={`signature ${isRealName ? "secret" : "no-doc-scroll"}`}
        onClick={evolve}
      >
        <span className="l cap">a</span>
        <span className="l">i</span>
        <span className="l change L1">
          <div className="start">l</div>
          <div className="end">d</div>
        </span>
        <span className="l">a</span>
        <span className="l">n</span>
        <br />
        <span className="l change T2">
          <div className="start">t</div>
          <div className="end"> </div>
        </span>
        <span className="l">h</span>
        <span className="l change U3">
          <div className="start">u</div>
          <div className="end"> </div>
        </span>
        <span className="l change S4">
          <div className="start">s</div>
          <div className="end">h</div>
        </span>
      </h1>
    </div>
  );
}
