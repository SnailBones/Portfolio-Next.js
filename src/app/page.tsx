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
  const [lockedToTrees, setLockedToTrees] = useState<boolean>(true);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const pathname = usePathname();
  console.log("page. trees locked is", lockedToTrees);

  // Unlock trees when loading a project
  useEffect(() => {
    if (lockedToTrees && pathname !== "/") {
      setLockedToTrees(false);
    }
    console.log(
      "page useEffect trigger because lockedToTrees was changed to",
      lockedToTrees
    );
  }, [lockedToTrees, pathname]);

  // Since app open with scrolling disabled, we need to make sure
  // the browser doesn't preserve scroll position on refresh.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  async function onClickName() {
    if (transitioning) return;

    setTransitioning(true);
    setLockedToTrees(!lockedToTrees);

    if (lockedToTrees) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await smoothScrollTo("#about", 2000);
    } else {
      await smoothScrollTo(".background", 2000);
    }

    setTransitioning(false);
  }

  return (
    <RedirectHandler>
      <div
        className={`app-container ${
          lockedToTrees || transitioning ? "no-doc-scroll" : ""
        }`}
      >
        <Title isRealName={!lockedToTrees} handleClick={onClickName} />

        <div>
          <div className="dark-overlay fade-in">
            <div className="screen-space">
              <About />
            </div>
            <div id="portfolio">
              <PortfolioContainer />
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
