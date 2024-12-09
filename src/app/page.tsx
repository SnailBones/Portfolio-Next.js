"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./home.scss";
import RedirectHandler from "../components/Redirect";
import Title from "@/components/Title";
import PortfolioContainer from "@/components/PortfolioContainer";
import About from "./about/page";
import ContactForm from "./contact/page";
import Footer from "@/components/Footer";
import { smoothScrollTo } from "@/utils/smoothScroll";

const Home = () => {
  const [treesLocked, setTreesLocked] = useState<boolean>(true);
  const pathname = usePathname();

  // Unlock trees when loading a project
  useEffect(() => {
    if (treesLocked && pathname !== "/") {
      setTreesLocked(false);
    }
  }, [treesLocked, pathname]);

  // Since app open with scrolling disabled, we need to make sure
  // the browser doesn't preserve scroll position on refresh.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function onClickName() {
    if (treesLocked) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        smoothScrollTo("#portfolio", 2000);
      }, 1000);
    } else {
      smoothScrollTo(".background", 2000);
    }
    setTreesLocked(!treesLocked);
  }
  return (
    <RedirectHandler>
      <div className={`app-container ${treesLocked ? "no-doc-scroll" : ""}`}>
        <Title isRealName={!treesLocked} handleClick={onClickName} />
        <div id="portfolio">
          <PortfolioContainer />
        </div>

        <div>
          <div className="dark-overlay">
            <div className="screen-space">
              <About />
            </div>
            <div className="screen-space">
              <ContactForm />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </RedirectHandler>
  );
};

export default Home;
