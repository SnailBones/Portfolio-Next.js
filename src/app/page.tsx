import RedirectHandler from "../components/RedirectHandler";
import "./home.scss";
import TreeCanvas from "../components/treeViz/treeViz";
import Title from "@/components/Title";
import PortfolioContainer from "@/components/PortfolioContainer";
import About from "./about/page";
import ContactForm from "./contact/page";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <RedirectHandler>
      <div className="background">
        <TreeCanvas gap={15} width={10} height={10} />
      </div>
      <div className="app-container">
        <Title />
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
