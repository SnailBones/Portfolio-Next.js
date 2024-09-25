// "use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { getRandomElements } from "@/utils/getRandomElements";
import { web, games, other, Project } from "../components/Projects";
interface Section {
  label: string;
  src: string;
}

// type PortfolioProps = {
//   selectedProjects: Project[];
// };

const allProjects = [...web, ...games, ...other];
const filteredProjects = allProjects;
if (filteredProjects.length < 3) {
  console.error("TODO: handle < 3 valid projects");
}

const Portfolio = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [_, section, subSection] = pathname.split("/");
  const expandedSection = section;

  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  useEffect(() => {
    setSelectedProjects(getRandomElements(filteredProjects, 3));
  }, []);

  const expandSection = useCallback((label: string) => {
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
  }, []);

  function handleClick(id: number) {
    const project = selectedProjects[id].id;
    console.log("clicked on id", id, "project name", project);
    if (expandedSection !== project) {
      router.push(`games/${project}`, { scroll: false });
    }
  }

  const handleClose = useCallback(() => {
    document.body.style.overflow = "unset"; // perhaps set this in response to path
    router.push("/", { scroll: false });
  }, [router]);

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

  if (!selectedProjects) {
    return <div>No projects were found.</div>;
  }

  return (
    <div className="portfolio">
      {selectedProjects.map((p, i: number) => {
        console.log("p is", p, "i is", i);
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
            {/* <h2>{p.name}</h2>
            <p>{p.description}</p> */}
          </>
        );
      })}
    </div>
  );
};

export default Portfolio;
