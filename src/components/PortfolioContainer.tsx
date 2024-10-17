"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from "react";
import Portfolio from "./Portfolio";
import { getRandomElements } from "@/utils/getRandomElements";
import { Project, projects } from "../components/Projects";
import { useRouter } from "next/navigation";
import "./PortfolioContainer.scss";

const TAGS = ["web", "game", "other"];

const PortfolioContainer = () => {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>(TAGS);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  //  Initialize selected tags from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagsFromUrl = params.get("tags");
    if (tagsFromUrl) {
      const tagsArray = tagsFromUrl.split("-");
      setSelectedTags(tagsArray);
    }
  }, []);

  // Update URL query when selectedTags changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // If all or none of the tags are selected, remove the 'tags' parameter
    if (selectedTags.length === 0 || selectedTags.length === TAGS.length) {
      params.delete("tags");
    } else {
      params.set("tags", selectedTags.join("-"));
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, {
      scroll: false,
    });
  }, [selectedTags, router]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Filter and randomize projects based on selected tags when the component mounts or when tags change
  const pickRandomProjects = useCallback(() => {
    // Treat no tags as all tags
    if (!selectedTags.length || selectedTags.length === TAGS.length) {
      setSelectedProjects(getRandomElements(projects, 3));
    } else {
      const filteredProjects = projects.filter((project) =>
        selectedTags.some((tag) => project.categories.includes(tag))
      );

      // todo: don't reuse past projects when possible
      if (filteredProjects.length < 3) {
        console.error("TODO: handle < 3 valid projects");
      }

      setSelectedProjects(getRandomElements(filteredProjects, 3));
    }
  }, [selectedTags]);

  useEffect(() => {
    pickRandomProjects();
  }, [pickRandomProjects]);

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>Here's three things I made, chosen at random.</h2>
        <h3>
          Tweak the buttons to show and hide different projects, or
          <button
            type="button"
            className={`btn btn-primary`}
            onClick={() => pickRandomProjects()}
          >
            Show new projects.
          </button>
        </h3>
      </div>
      <div className="button-container">
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
      </div>
      <Portfolio projects={selectedProjects} />
    </div>
  );
};

export default PortfolioContainer;
