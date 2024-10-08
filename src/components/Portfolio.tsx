import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { getRandomElements } from "@/utils/getRandomElements";
import { Project, projects } from "../components/Projects";
// interface Section {
//   label: string;
//   src: string;
// }

// type PortfolioProps = {
//   selectedProjects: Project[];
// };

const Portfolio = ({ projects }: { projects: Project[] }) => {
  const router = useRouter();
  const pathname = usePathname();

  // const [_, section, subSection] = pathname.split("/");
  const [expandedSection, setExpandedSection] = useState<string>("");

  const expandSection = useCallback((label: string) => {
    // document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
    setExpandedSection(label);
    console.log("expanding");
  }, []);

  const closeSection = useCallback(() => {
    document.body.style.overflow = "unset";
    setExpandedSection("");
  }, []);

  function handleClick(id: number) {
    const project = projects[id].id;
    console.log("clicked on id", id, "project name", project);
    expandSection(project);
  }

  useEffect(() => {
    const [_, section, subSection] = pathname.split("/");
    if (section) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeSection();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [pathname, closeSection]);

  if (!projects) {
    return <div>No projects were found.</div>;
  }

  return (
    <div className="portfolio">
      {projects.map((p, i: number) => {
        return (
          <>
            <VideoSection
              key={p.id}
              project={p}
              onClose={closeSection}
              expandedState={
                expandedSection
                  ? expandedSection === p.id
                    ? "expanded"
                    : "diminished"
                  : ""
              }
              portfolioOnClick={() => handleClick(i)}
            />
          </>
        );
      })}
    </div>
  );
};

export default Portfolio;
