/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./about.scss";
import MarkdownContent from "./about.mdx";

const About = () => {
  return (
    <div id="about">
      <MarkdownContent />
    </div>
  );
};

export default About;
