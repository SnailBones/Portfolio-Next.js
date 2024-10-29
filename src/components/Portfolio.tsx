import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { Project } from "../components/Projects";
import ProjectText from "./ProjectText";

const Portfolio = ({
  projects,
  expandedSection,
  descriptionVisible,
  closeProject,
  handleClick,
}: {
  projects: Project[];
  expandedSection: string;
  descriptionVisible: boolean;
  closeProject: () => void;
  handleClick: (id: number) => void;
}) => {
  useEffect(() => {
    if (expandedSection) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeProject();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [closeProject, expandedSection]);

  if (!projects) {
    return <div>No projects were found.</div>;
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div className="portfolio">
        {projects.map((p, i) => (
          <VideoSection
            key={p.id}
            project={p}
            onClose={closeProject}
            state={
              expandedSection
                ? expandedSection === p.id
                  ? descriptionVisible
                    ? "description"
                    : "expanded"
                  : "collapsed"
                : ""
            }
            onClick={() => handleClick(i)}
            animationDelay={i * 0.1}
          />
        ))}
        {expandedSection && (
          <div
            key="sidebar"
            className={"sidebar " + (descriptionVisible ? "visible" : "hidden")}
          >
            <ProjectText markdownPath={`${expandedSection}/page.mdx`} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Portfolio;
