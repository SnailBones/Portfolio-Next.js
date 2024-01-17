/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./about.scss";
import MarkdownContent from "./about.mdx";

const About = () => {
  const scrollToGallery = () => {
    const galleryElement = document.querySelector(".gallery");
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="bottom">
      <MarkdownContent />
    </div>
  );
};

export default About;
