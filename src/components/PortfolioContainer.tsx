/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Portfolio from "./Portfolio";
import { getRandomElements } from "@/utils/getRandomElements";
import { Project, projects } from "../components/Projects";
import "./PortfolioContainer.scss";

const filteredProjects = projects;
if (filteredProjects.length < 3) {
  console.error("TODO: handle < 3 valid projects");
}

const PortfolioContainer = () => {
  return (
    <div className="portfolio-container">
      <h2>Here's three things I made, randomly selected.</h2>
      <br />
      <h3>Tweak the buttons to see more.</h3>
      <Portfolio />
    </div>
  );
};

export default PortfolioContainer;
