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

const TAGS = ["web", "game", "design", "other"];
// const BUTTON_TAGS = {
//   code: ["web", "game", "ml"],
//   design: ["web", "game", "other"],
// };

// const BUTTON_LAYOUT = {
//   "code": {"web": "web", "game": "game", "ml":"ml"},
//   "design": {"web":"web-", "game", "other"],
// };

const CODE_BUTTS = ["web", "game", "ml"];

const DESIGN_BUTTS = ["web-design", "game-design", "other-design"];

const BUTTON_LAYOUT = {
  code: CODE_BUTTS,
  design: DESIGN_BUTTS,
  other: "other",
};

const PortfolioContainer = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>(TAGS);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const previousProjectsRef = useRef<Project[]>([]); // Used to avoid showing last projects on change

  const router = useRouter();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string>("");
  const [_, section, openProject] = pathname.split("/");
  const descriptionVisible = openProject ? true : false;

  const openDescription = useCallback(
    (openProject: string) => {
      router.push(`/project/${openProject}`, { scroll: false });
    },
    [router]
  );

  const closeDescription = useCallback(() => {
    if (section) {
      router.push("/", { scroll: false });
    }
  }, [router, section]);

  const expandProject = useCallback((label: string) => {
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
    setExpandedSection(label);
  }, []);

  const closeProject = useCallback(() => {
    document.body.style.overflow = "unset";
    setExpandedSection("");
    closeDescription();
  }, [closeDescription]);

  const toggleDescription = useCallback(() => {
    if (descriptionVisible) {
      closeDescription();
    } else {
      openDescription(expandedSection);
    }
  }, [expandedSection, descriptionVisible, closeDescription, openDescription]);

  function clickOnVideo(id: number) {
    const project = selectedProjects[id].id;
    if (expandedSection === project) {
      toggleDescription();
    } else {
      expandProject(project);
    }
  }

  const URL_BREAK = "--";

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
    if (selectedTags.length === 0 || selectedTags.length === TAGS.length) {
      params.delete("tags");
    } else {
      params.set("tags", selectedTags.join(URL_BREAK));
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, {
      scroll: false,
    });
  }, [selectedTags, router]);

  const selectNewProjects = useCallback(() => {
    closeProject();
    // Treat no tags as all tags
    const allTags = !selectedTags.length || selectedTags.length === TAGS.length;
    const filteredProjects = allTags
      ? [...allProjects]
      : allProjects.filter((project) =>
          selectedTags.some((tag) => project.categories.includes(tag))
        );
    // Exclude old projects if there are enough new ones
    const oldProjects = previousProjectsRef.current;
    for (const oldProject of oldProjects) {
      const index = filteredProjects.indexOf(oldProject);
      if (index > -1 && filteredProjects.length > 3) {
        filteredProjects.splice(index, 1);
      }
    }

    // if (filteredProjects.length < 3) {
    //   console.error("TODO: handle < 3 valid projects");
    // }
    const newProjects = getRandomElements(filteredProjects, 3);
    setSelectedProjects(newProjects);
    previousProjectsRef.current = newProjects; // Used to avoid showing last projects on change (see newProjects);
  }, [selectedTags, closeProject]);

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

    console.log("toggling group!", disable ? "disable" : "enable");
    setSelectedTags((prevTags) =>
      disable
        ? prevTags.filter((t) => !tags.includes(t))
        : [...prevTags, ...tags]
    );
    smoothScrollTo("#portfolio", 500);
  };

  return (
    <div className="portfolio-container">
      <Portfolio
        projects={selectedProjects}
        expandedSection={expandedSection}
        descriptionVisible={descriptionVisible}
        closeProject={closeProject}
        handleClick={clickOnVideo}
      />
      <div
        className={`controls-container ${descriptionVisible ? "hidden" : ""}`}
      >
        <div className="portfolio-instructions">
          <h2>Here's three random things I made.</h2>
          <h3>
            Click to learn more, tweak the buttons to view different projects,
            or
            <button
              type="button"
              className={"btn"}
              onClick={() => {
                selectNewProjects();
                smoothScrollTo("#portfolio", 500);
              }}
            >
              show new projects.
            </button>
          </h3>
        </div>
        <div className="button-container">
          <div className="tag-buttons">
            {/* todo: no nested buttons */}
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
                  isSelected={selectedTags.includes(tag)}
                  onClick={toggleTag}
                />
              ))}
            </div>
            <PortfolioButton
              tag={"other"}
              isSelected={selectedTags.includes("other")}
              onClick={toggleTag}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContainer;
