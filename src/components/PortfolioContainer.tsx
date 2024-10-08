"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Portfolio from "./Portfolio";
import { getRandomElements } from "@/utils/getRandomElements";
import { Project, projects } from "../components/Projects";
import "./PortfolioContainer.scss";

const TAGS = ["web", "game", "other"];

const PortfolioContainer = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(TAGS);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  // Filter and randomize projects based on selected tags when the component mounts
  useEffect(() => {
    // Treat no tags as all tags
    if (!selectedTags.length || selectedTags.length === TAGS.length) {
      setSelectedProjects(getRandomElements(projects, 3));
    } else {
      const filteredProjects = projects.filter((project) =>
        selectedTags.some((tag) => project.categories.includes(tag))
      );

      if (filteredProjects.length < 3) {
        console.error("TODO: handle < 3 valid projects");
      }

      setSelectedProjects(getRandomElements(filteredProjects, 3));
    }
  }, [selectedTags]);
  // const selectedProjects = getRandomElements(filteredProjects, 3);
  return (
    <div className="portfolio-container">
      <h2>Here's three things I made, chosen at random.</h2>
      <br />
      <h3>Tweak the buttons to see more.</h3>
      <div className="tag-buttons">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`btn ${
              selectedTags.includes(tag) ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="tag-buttons">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`btn ${
              selectedTags.includes(tag) ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <Portfolio projects={selectedProjects} />
    </div>
  );
};

export default PortfolioContainer;
