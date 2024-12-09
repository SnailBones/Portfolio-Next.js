"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { getRandomElements } from "@/utils/getRandomElements";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { Project, projects as allProjects } from "./Projects";
import Portfolio from "./Portfolio";
import PortfolioButton from "./PortfolioButton";
import { useRouter, usePathname } from "next/navigation";
import "./PortfolioContainer.scss";
import { select } from "framer-motion/client";

const CODE_BUTTS = ["web", "game", "ml"];
// const DESIGN_BUTTS = ["web-design", "game-design", "other-design"];
const DESIGN_BUTTS = ["web-design", "game-design"];

const BUTTON_LAYOUT = {
  code: CODE_BUTTS,
  design: DESIGN_BUTTS,
  // other: "other",
};

const TAG_NAMES = {
  "web-design": "web",
  "game-design": "game",
  "other-design": "other",
};

// const ALL_TAGS = [...CODE_BUTTS, ...DESIGN_BUTTS, "other"];
const ALL_TAGS = [...CODE_BUTTS, ...DESIGN_BUTTS];

const URL_BREAK = "."; // Non-digit unreserved characters are "-._~"

const PortfolioContainer = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(ALL_TAGS);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const previousProjectsRef = useRef<Project[]>([]); // Used to avoid showing last projects on change

  const router = useRouter();
  const pathname = usePathname();
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);
  const [expandedSection, setExpandedSection] = useState<string>("");
  const [_, section, openProject] = pathname.split("/");

  const openDescription = useCallback(
    (openProject: string) => {
      router.push(`/project/${openProject}`, { scroll: false });
    },
    [router]
  );

  const getParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    // If all or none of the tags are selected, remove the 'tags' parameter
    if (selectedTags.length === 0 || selectedTags.length === ALL_TAGS.length) {
      params.delete("tags");
    } else {
      params.set("tags", selectedTags.join(URL_BREAK));
    }
    return params.toString();
  }, [selectedTags]);

  const closeDescription = useCallback(() => {
    if (section) {
      router.push(`/?${getParams()}`, { scroll: false });
    }
  }, [router, section, getParams]);

  const expandProject = useCallback((label: string) => {
    smoothScrollTo("#portfolio");
    setExpandedSection(label);
  }, []);

  const closeProject = useCallback(() => {
    setExpandedSection("");
    closeDescription();
  }, [closeDescription]);

  const toggleDescription = useCallback(() => {
    if (!!openProject) {
      closeDescription();
    } else {
      openDescription(expandedSection);
    }
  }, [expandedSection, openProject, closeDescription, openDescription]);

  function clickOnVideo(id: number) {
    const project = selectedProjects[id].id;
    if (expandedSection === project) {
      toggleDescription();
    } else {
      expandProject(project);
    }
  }

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
    smoothScrollTo("#portfolio", 500);
  };

  //  Initialize selected tags from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagsFromUrl = params.get("tags");
    if (tagsFromUrl) {
      const tagsArray = tagsFromUrl.split(URL_BREAK);
      setSelectedTags(tagsArray);
    }
  }, []);

  // Update URL query when selectedTags changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // If all or none of the tags are selected, remove the 'tags' parameter
    if (selectedTags.length === 0 || selectedTags.length === ALL_TAGS.length) {
      params.delete("tags");
    } else {
      params.set("tags", selectedTags.join(URL_BREAK));
    }
    const newUrl = `${window.location.pathname}?${getParams()}`;
    router.replace(newUrl, {
      scroll: false,
    });
  }, [selectedTags, router, getParams]);

  const selectNewProjects = useCallback(() => {
    // closeProject();
    // Treat no tags as all tags
    const allTags =
      !selectedTags.length || selectedTags.length === ALL_TAGS.length;
    let filteredProjects = allTags
      ? [...allProjects]
      : allProjects.filter((project) =>
          selectedTags.some((tag) => project.categories.includes(tag))
        );
    // No duplicate projects when you start with one open
    if (openProject) {
      filteredProjects = filteredProjects.filter((p) => p.id !== openProject);
    }
    // Exclude old projects if there are enough new ones
    const oldProjects = previousProjectsRef.current;
    for (const oldProject of oldProjects) {
      const index = filteredProjects.indexOf(oldProject);
      if (index > -1 && filteredProjects.length > 3) {
        filteredProjects.splice(index, 1);
      }
    }
    const newProjects = getRandomElements(filteredProjects, 3);

    if (openProject) {
      const project1 = allProjects.find((p) => p.id === openProject);
      if (project1) {
        newProjects[1] = project1;
        expandProject(openProject);
      }
    }
    setSelectedProjects(newProjects);
    previousProjectsRef.current = newProjects; // Used to avoid showing last projects on change (see newProjects);
  }, [selectedTags, openProject, expandProject]);

  useEffect(() => {
    selectNewProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
    smoothScrollTo("#portfolio", 500);
  };

  const toggleGroup = (tags: string[]) => {
    const disable = tags.reduce(
      (acc, tag) => acc || selectedTags.includes(tag),
      false
    );

    setSelectedTags((prevTags) =>
      disable
        ? prevTags.filter((t) => !tags.includes(t))
        : [...prevTags, ...tags]
    );
    smoothScrollTo("#portfolio", 500);
  };

  return (
    <div
      className={`portfolio-container ${
        !!expandedSection ? "no-doc-scroll" : ""
      }`}
    >
      <Portfolio
        projects={selectedProjects}
        expandedSection={expandedSection}
        descriptionVisible={!!openProject}
        closeProject={closeProject}
        handleClick={clickOnVideo}
      />
      <div className={`controls-and-toggle`}>
        <button
          aria-expanded={controlsVisible}
          className={`toggle-button ${!!expandedSection ? "hidden" : ""}`}
          onClick={toggleControls}
        >
          <span className="arrow">{controlsVisible ? "▼" : "▲"}</span>
        </button>
        <div
          className={`controls ${
            !!expandedSection || !controlsVisible ? "hidden" : ""
          }`}
        >
          <div className="portfolio-instructions">
            <h2>Here's 3 things I made.</h2>
            <h4>
              Click one to learn more, or filter projects with these buttons.
            </h4>
          </div>
          <div className="portfolio-buttons">
            <div
              className={`btn-grp ${
                CODE_BUTTS.some((tag) => selectedTags.includes(tag))
                  ? ""
                  : "all-off"
              }`}
              onClick={() => toggleGroup(CODE_BUTTS)}
            >
              <div className="nested-btn-title">code</div>
              {BUTTON_LAYOUT.code.map((tag) => (
                <PortfolioButton
                  key={tag}
                  tag={tag}
                  isSelected={selectedTags.includes(tag)}
                  onClick={toggleTag}
                />
              ))}
            </div>
            <div
              className={`btn-grp ${
                DESIGN_BUTTS.some((tag) => selectedTags.includes(tag))
                  ? ""
                  : "all-off"
              }`}
              onClick={() => toggleGroup(DESIGN_BUTTS)}
            >
              <div className="nested-btn-title">design</div>
              {BUTTON_LAYOUT.design.map((tag) => (
                <PortfolioButton
                  key={tag}
                  tag={tag}
                  displayName={tag.split("-")[0]}
                  isSelected={selectedTags.includes(tag)}
                  onClick={toggleTag}
                />
              ))}
            </div>
            <div className="simple-btn-container">
              <button
                type="button"
                className={"btn btn-normal"}
                onClick={() => {
                  selectNewProjects();
                  smoothScrollTo("#portfolio", 500);
                }}
              >
                Show new projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
