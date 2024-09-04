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
  const router = useRouter();
  const pathname = usePathname();

  const [_, section, subSection] = pathname.split("/");
  const expandedSection = section;

  const expandSection = useCallback((label: string) => {
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio");
  }, []);

  function handleClick(label: string) {
    if (expandedSection !== label) {
      router.push(`/${label}`, { scroll: false });
    }
  }

  const handleClose = useCallback(() => {
    document.body.style.overflow = "unset"; // perhaps set this in response to path
    // setExpandedSection(null);
    router.push("/", { scroll: false });
  }, [router]);

  useEffect(() => {
    if (expandedSection && sectionNames.includes(expandedSection)) {
      expandSection(expandedSection);
    }
  }, [expandedSection, expandSection]);

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
