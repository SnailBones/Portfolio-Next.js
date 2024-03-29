"use client";

import { useState } from "react";
import "./home.scss";
import TreeCanvas from "./altissima/page";
import Portfolio from "@/components/Portfolio";
import About from "./about/page";
import ContactForm from "./contact/page";
import Footer from "@/components/Footer";
import { smoothScrollTo } from "@/utils";

const Home = () => {
    const [isRealName, setIsRealName] = useState(false);

    const evolve = () => {
        if (!isRealName) {
            setTimeout(() => {
                smoothScrollTo("#portfolio", 2000);
            }, 1000);
        }
        setIsRealName(!isRealName);
    };

    return (
        <div>
            <div className="background">
                <TreeCanvas gap={15} width={10} height={10} />
            </div>
            <div className="app-container">
                <div className="screen-space">
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
                </div>
                <div id="portfolio">
                    <Portfolio />
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
        </div>
    );
};

export default Home;
