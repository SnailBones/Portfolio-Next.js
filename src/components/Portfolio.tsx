"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GetStaticProps } from "next";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils";
import { web, games, other, Project } from "../components/Projects";

interface Section {
  label: string;
  src: string;
}

type PortfolioProps = {
  selectedProjects: Project[];
};

const allProjects = [...web, ...games, ...other];
// const sectionNames = ["web", "games", "other"];
const filteredProjects = allProjects;
if (filteredProjects.length < 3) {
  console.error("TODO: handle < 3 valid projects");
}

function pickRandomProjects<T>(projects: T[], count: number): T[] {
  const length = projects.length;

  if (count > length) {
    throw new Error("count greater than the array length");
  }

  const indices = new Set<number>();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * length);
    indices.add(randomIndex);
  }

  return Array.from(indices).map((index) => projects[index]);
}

const indices = new Set<number>();
while (indices.size < 3) {
  const randomIndex = Math.floor(Math.random() * filteredProjects.length);
  indices.add(randomIndex);
}

const projects = Array.from(indices).map((index) => filteredProjects[index]);
// const videoSections = [
//   { label: sectionNames[0], projects: web },
//   { label: sectionNames[1], projects: games },
//   { label: sectionNames[2], projects: other },
// ];

export const getStaticProps: GetStaticProps = async () => {
  const chosenProjects = pickRandomProjects(projects, 3);

  return {
    props: {
      chosenProjects,
    },
  };
};

const Portfolio = ({ selectedProjects }: PortfolioProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [_, section, subSection] = pathname.split("/");
  const expandedSection = section;

  const expandSection = useCallback((label: string) => {
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
  }, []);

  function handleClick(id: number) {
    const project = projects[id].id;
    console.log("clicked on id", id, "project name", project);
    if (expandedSection !== project) {
      router.push(`games/${project}`, { scroll: false });
    }
  }

  const handleClose = useCallback(() => {
    document.body.style.overflow = "unset"; // perhaps set this in response to path
    // setExpandedSection(null);
    router.push("/", { scroll: false });
  }, [router]);

  // useEffect(() => {
  //   if (expandedSection && sectionNames.includes(expandedSection)) {
  //     expandSection(expandedSection);
  //   }
  // }, [expandedSection, expandSection]);

  useEffect(() => {
    const [_, section, subSection] = pathname.split("/");
    if (section) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [pathname, handleClose]);

  return (
    <div className="portfolio">
      {selectedProjects.map((p, i) => {
        // const label = category.label;
        return (
          <>
            <VideoSection
              key={p.id}
              project={p}
              onClose={handleClose}
              expandedState={
                expandedSection
                  ? expandedSection === "games"
                    ? "expanded"
                    : "diminished"
                  : ""
              }
              portfolioOnClick={() => handleClick(i)}
            />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
          </>
        );
      })}
    </div>
  );
};

export default Portfolio;
