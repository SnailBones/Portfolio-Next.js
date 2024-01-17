"use client";

import { useState } from "react";
import Image from "next/image";
import "./home.scss";
import TreeCanvas from "./altissima/page";
import About from "./about/page";

const Home = () => {
  const [isRealName, setIsRealName] = useState(false);

  const evolve = () => {
    setIsRealName(!isRealName);
    if (isRealName) {
      setTimeout(() => {
        document
          .querySelector(".gallery")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  };

  return (
    <div className="home">
      <div className="title-card">
        <TreeCanvas gap={15} width={10} height={10} />
      </div>

      <h1
        className={`signature ${isRealName ? "secret" : ""}`}
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

      <div className="content">
        <div className="gallery">
          {/* Thumbnail components with props */}
          {/* Import images and videos differently in Next.js */}
        </div>
      </div>

      <div>
        <div className="tall-dark-space">
          <About />
          <div className="footer">
            <div id="footer-links">
              <a
                className="smallfade icon-container"
                href="https://github.com/SnailBones"
              >
                {/* <Image
                  src="/link-icons/GitHub-Mark-Light-64px.png"
                  alt="Github"
                  width={48}
                  height={48}
                /> */}
                <img src="/link-icons/GitHub-Mark-Light-64px.png" />
              </a>
              <a
                className="smallfade icon-container"
                href="https://codepen.io/snailbones"
              >
                <Image
                  src="/link-icons/codepenlogo.png"
                  alt="Codepen"
                  width={48}
                  height={48}
                />
              </a>
              <a
                className="smallfade icon-container"
                href="https://www.shadertoy.com/user/ailanthus"
                style={{
                  color: "white",
                  fontFamily: "Lobster,Tahoma,Arial",
                  fontSize: "36px",
                }}
              >
                S
              </a>
              <div>
                <a
                  className="smallfade icon-container"
                  href="https://medium.com/@snailbones"
                >
                  <Image
                    src="/link-icons/medium.png"
                    alt="Medium"
                    width={48}
                    height={48}
                  />
                </a>
              </div>
              <div>
                <a
                  className="smallfade icon-container"
                  href="https://ailanthus.itch.io/"
                >
                  <Image
                    src="/link-icons/itch.png"
                    alt="Itch.io"
                    width={48}
                    height={48}
                  />
                </a>
              </div>
              <div>
                <a
                  className="smallfade icon-container"
                  href="mailto:aidhendrickson@gmail.com"
                >
                  <Image
                    src="/link-icons/email.svg"
                    alt="Email"
                    width={48}
                    height={48}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
