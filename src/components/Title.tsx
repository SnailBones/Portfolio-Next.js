"use client";

import { useState, useEffect } from "react";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function Title() {
  const [isRealName, setIsRealName] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function evolve() {
    if (!isRealName) {
      document.body.style.overflow = "hidden";
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
