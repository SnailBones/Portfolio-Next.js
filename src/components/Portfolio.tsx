"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils";

interface Section {
  label: string;
  src: string;
}

import { web, games, other } from "../components/Projects";

const videoSections = [
  { label: "web", projects: web },
  { label: "games", projects: games },
  { label: "other", projects: other },
];

const Portfolio: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [autoScrolling, setAutoScrolling] = useState<boolean>(false);

  const router = useRouter();

  function expandSection(label: string) {
    // if (label[0] !== "#") label = `#${label}`;
    console.log("expanding section", label);
    setExpandedSection(label);
    setAutoScrolling(true);
    document.body.style.overflow = "hidden";
    smoothScrollTo("#portfolio").then(() => {
      setAutoScrolling(false);
    });
  }

  function handleClick(label: string) {
    if (expandedSection !== label) {
      router.push(`#${label}`);
      expandSection(label);
    }
  }

  function handleClose() {
    document.body.style.overflow = "unset";
    setExpandedSection(null);
    router.push("/", { scroll: false });
  }

  // Routing
  const params = useParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      console.log("Hash:", hash);
      expandSection(hash.slice(1));
    }
  }, [params]);

  useEffect(() => {
    if (expandedSection) {
      const handleKeyDown = (e: KeyboardEvent) => {
        console.log("key", e.key);
        if (e.key === "Escape") {
          handleClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [expandedSection]);

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
