"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils";

interface Section {
  label: string;
  src: string;
}

import { web, games, other } from "../components/Projects";

const sectionNames = ["web", "games", "other"];

const videoSections = [
  { label: sectionNames[0], projects: web },
  { label: sectionNames[1], projects: games },
  { label: sectionNames[2], projects: other },
];

const Portfolio: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  function expandSection(label: string) {
    setExpandedSection(label);
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
  }

  function handleClick(label: string) {
    if (expandedSection !== label) {
      router.push(`/${label}`, { scroll: false });
    }
  }

  const handleClose = useCallback(() => {
    document.body.style.overflow = "unset";
    setExpandedSection(null);
    router.push("/", { scroll: false });
  }, [setExpandedSection, router]);

  useEffect(() => {
    // const section = pathname.slice(1);
    const [_, section, subSection] = pathname.split("/");
    if (section && sectionNames.includes(section)) {
      expandSection(section);
    }
  }, [pathname]);

  useEffect(() => {
    if (expandedSection) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [expandedSection, handleClose]);

  return (
    <div className="portfolio">
      {videoSections.map((category) => {
        const label = category.label;
        return (
          <VideoSection
            key={label}
            projects={category.projects}
            projectCategory={label}
            onClose={handleClose}
            expandedState={
              expandedSection
                ? expandedSection === label
                  ? "expanded"
                  : "diminished"
                : ""
            }
            portfolioOnClick={() => handleClick(label)}
          />
        );
      })}
    </div>
  );
};

export default Portfolio;
