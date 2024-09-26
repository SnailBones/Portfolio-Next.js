export type Project = {
  id: string;
  name: string;
  src: string;
  description: string;
  year?: number;
  tools?: string[];
};

export const projects = [
  {
    id: "globe",
    name: "Mapbox Globe",
    src: "globe/globe.webm",
    description: "Adding a globe view to Mapbox GL JS.",
    categories: ["web"],
    tools: ["TypeScript (Flow)", "WebGL"],
  },
  {
    id: "grid",
    name: "Electric Power Fast",
    src: "epfast/loop.webm",
    description: "Vizualizing chaos in the grid.",
    categories: ["web"],
    tools: ["JavaScript", "Vue.js", "Mapbox GL JS"],
  },
  {
    id: "forage",
    name: "Forage Albuquerque",
    src: "forage/home.png",
    description: "A responsive app introducing beginners to foraging.",
    categories: ["web"],
    tools: ["React", "Next.js", "TypeScript"],
  },
  // games
  {
    id: "okeeffe",
    name: "Seeing Beyond",
    src: "okeeffe/okeeffe.mp4",
    description: "An interactive installation at the Georgia Okeeffe Museum.",
    year: 2019,
    categories: ["game, web"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "cactris",
    name: "Cactris",
    src: "ball/cactris.mp4",
    description: "A puzzle game played with your body.",
    year: 2020,
    categories: ["game, web"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "forest",
    name: "A Tree Falls: the Musical",
    src: "forest/forest.webm",
    description: "An interactive ecology simulation to procedural music.",
    categories: ["game"],
    tools: ["C++", "Godot"],
  },
  {
    id: "worms",
    name: "Worm Royale",
    src: "worms/worms.webm",
    description: "Duel other players in real space to grow the longest worm.",
    year: 2019,
    categories: ["game"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "runner",
    name: "Prism Escape",
    src: "runner/runner.webm",
    description:
      "Move your body to race through a virtual landscape in this AR agility game.",
    year: 2019,
    categories: ["game"],
    tools: ["JavaScript", "GLSL"],
  },
  {
    id: "trees",
    name: "What Trees Were",
    src: "trees/sea-serpent.webm",
    description: "Customizable 3d tree engine.",
    categories: ["game"],
    tools: ["Java"],
    year: 2017,
  },
  {
    id: "lamplight",
    name: "Lamplight",
    src: "lamplight/lamplight.webm",
    description: "Moth simulator.",
    categories: ["game"],
    tools: ["GameMaker"],
    year: 2013,
  },
  // other
  {
    id: "gan",
    name: "Renaissance GAN",
    src: "gan/bush.webm",
    description:
      "A Convolutional Generative Adversarial Network for Creating Music and Art.",
    categories: ["machine learning"],
  },
  {
    id: "nature",
    name: "Nature Now",
    src: "museum/models/labside.jpg",
    description: "Design for a museum exhibit bringing the diorama up-to-date.",
    categories: ["design"],
  },
  {
    id: "plays",
    name: "Plays",
    src: "painless/set.jpg",
    description: "",
    categories: ["other"],
  },
];
