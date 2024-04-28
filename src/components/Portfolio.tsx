import React, { useState, useEffect } from "react";
import VideoSection from "../components/VideoSection";
import { smoothScrollTo } from "@/utils";

interface Section {
    label: string;
    src: string;
}

const web = [
    {
        id: "globe",
        name: "Mapbox Globe",
        src: "globe/globe.webm",
        description: "Adding a globe view to Mapbox GL JS.",
    },
    {
        id: "grid",
        name: "Electric Power Fast",
        src: "epfast/loop.webm",
        description: "Vizualizing chaos in the grid.",
    },
    {
        id: "forage",
        name: "Forage Albuquerque",
        src: "forage/home.png",
        description: "A responsive app introducing beginners to foraging.",
    },
    {
        id: "okeeffe",
        name: "Seeing Beyond",
        src: "okeeffe/okeeffe.mp4",
        description:
            "An interactive installation at the Georgia Okeeffe Museum.",
        year: 2019,
        tools: ["JavaScript", "GLSL"],
    },
];

const games = [
    {
        id: "cactris",
        name: "Cactris",
        src: "ball/cactris.mp4",
        description: "A puzzle game played with your body.",
        year: 2020,
        tools: ["JavaScript", "GLSL"],
    },
    {
        id: "forest",
        name: "A Tree Falls: the Musical",
        src: "forest/forest.webm",
        description: "An interactive ecology simulation to procedural music.",
    },
    {
        id: "worms",
        name: "Worm Royale",
        src: "worms/worms.webm",
        description:
            "Duel other players in real space to grow the longest worm.",
        year: 2019,
        tools: ["JavaScript", "GLSL"],
    },
    {
        id: "runner",
        name: "Prism Escape",
        src: "runner/runner.webm",
        description:
            "Move your body to race through a virtual landscape in this fast-paced agility game.",
        year: 2019,
        tools: ["JavaScript", "GLSL"],
    },
    {
        id: "trees",
        name: "What Trees were",
        src: "trees/sea-serpent.webm",
        description: "Customizable 3d tree engine.",
        tools: ["Java"],
        year: 2017,
    },
    {
        id: "lamplight",
        name: "Lamplight",
        src: "lamplight/lamplight.webm",
        description: "Moth simulator.",
        tools: ["GameMaker"],
        year: 2013,
    },
];

const other = [
    {
        id: "bush",
        name: "Renaissance GAN",
        src: "gan/bush.webm",
        description:
            "A bush generated using a Generative Adversarial Network (GAN).",
    },
    {
        id: "nature",
        name: "Nature Now",
        src: "museum/models/labside.jpg",
        description:
            "Design for a museum exhibit bringing the diorama up-to-date.",
    },
    {
        id: "painless",
        name: "Painless",
        src: "painless/set.jpg",
        description:
            "A play about pain, loss and choice in a world where technology enables all experiences.",
    },
];

// const videoSections = { web, games, other };
const videoSections = [
    { label: "web", projects: web },
    { label: "games", projects: games },
    { label: "other", projects: other },
];

const Portfolio: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [autoScrolling, setAutoScrolling] = useState<boolean>(false);

    function handleClick(label: string) {
        console.log("clicked!", label);
        if (expandedSection !== label) {
            setExpandedSection(label);
            setAutoScrolling(true);
            smoothScrollTo("#portfolio").then(() => {
                setAutoScrolling(false);
            });
        }
    }

    // Minimize expanded section when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (expandedSection !== null && !autoScrolling) {
                setExpandedSection(null);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Cleanup function to remove the event listener
        return () => window.removeEventListener("scroll", handleScroll);
    }, [expandedSection, autoScrolling]);

    return (
        <div className="portfolio">
            {videoSections.map((category) => {
                const label = category.label;
                return (
                    <VideoSection
                        key={label}
                        projects={category.projects}
                        projectCategory={label}
                        onClose={() => setExpandedSection(null)}
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
