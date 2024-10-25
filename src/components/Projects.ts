export type Project = {
  id: string;
  name: string;
  imgSrc: string;
  description: string;
  categories: string[];
  year?: number;
  tools?: string[];
};

export const projects: Project[] = [
  {
    id: "globe",
    name: "Mapbox Globe",
    imgSrc: "globe/globe.webm",
    description: "Adding a globe view to Mapbox GL JS.",
    categories: ["web"],
    tools: ["TypeScript", "WebGL"],
  },
  {
    id: "grid",
    name: "Electric Power Fast",
    imgSrc: "epfast/loop.webm",
    description: "Visualizing chaos in the grid.",
    categories: ["web"],
    tools: ["JavaScript", "Vue.js", "Mapbox GL JS"],
  },
  {
    id: "forage",
    name: "Forage Albuquerque",
    imgSrc: "forage/home.png",
    description: "A mobile friendly guide to the edible plants of Albuquerque.",
    categories: ["web"],
    tools: ["React", "Next.js", "TypeScript"],
  },
  // games
  {
    id: "okeeffe",
    name: "Seeing Beyond",
    imgSrc: "okeeffe/okeeffe.mp4",
    description: "An interactive installation at the Georgia Okeeffe Museum.",
    year: 2019,
    categories: ["game, web"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "cactris",
    name: "Cactris",
    imgSrc: "ball/cactris.mp4",
    description: "A match-three puzzle game played with your body.",
    year: 2020,
    categories: ["game, web"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "forest",
    name: "A Tree Falls: the Musical",
    imgSrc: "forest/forest.webm",
    description: "Interactive ecology put to data-driven music.",
    categories: ["game"],
    tools: ["C++", "Godot"],
  },
  {
    id: "worms",
    name: "Worm Royale",
    imgSrc: "worms/worms.webm",
    description:
      "Compete or cooperate with other players in real space to grow the longest worm.",
    year: 2019,
    categories: ["game", "design"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "runner",
    name: "Prism Escape",
    imgSrc: "runner/runner.webm",
    description:
      "Move your body to race through a virtual landscape in this AR agility game.",
    year: 2019,
    categories: ["game", "design"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "trees",
    name: "What Trees Were",
    imgSrc: "trees/sea-serpent.webm",
    description: "Customizable 3d tree engine.",
    categories: ["game"],
    tools: ["Java"],
    year: 2017,
  },
  {
    id: "lamplight",
    name: "Lamplight",
    imgSrc: "lamplight/lamplight.webm",
    description: "Moth simulator.",
    categories: ["game"],
    tools: ["GameMaker"],
    year: 2013,
  },
  // other
  {
    id: "gan",
    name: "Renaissance GAN",
    imgSrc: "gan/bush.webm",
    description:
      "A Convolutional Generative Adversarial Network for creating music and art.",
    categories: ["other", "machine learning"],
  },
  {
    id: "nature",
    name: "Nature Now",
    imgSrc: "museum/models/labside.jpg",
    description: "Design for a museum exhibit bringing the diorama up-to-date.",
    categories: ["other", "design"],
  },
  {
    id: "plays",
    name: "Plays",
    imgSrc: "painless/set.jpg",
    description: "",
    categories: ["other"],
  },
];
