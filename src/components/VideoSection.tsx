import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProjectText from "./ProjectText";
import "./VideoSection.scss";

interface Project {
  src: string;
  name: string;
  id: string;
}

interface VideoSectionProps {
  projectCategory: string;
  projects: Project[];
  expandedState: string;
  portfolioOnClick: () => void;
  onClose: () => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  projectCategory,
  projects,
  expandedState,
  portfolioOnClick,
  onClose,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projectView, setProjectView] = useState(false); // boolean
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(
    new Array(projects.length).fill(null)
  );
  const autoScrollTimer = useRef<number | NodeJS.Timeout | null>(null);

  const expanded = expandedState === "expanded";
  const currentProject = projects[currentProjectIndex];

  useEffect(() => {
    // Adjust the array size if the number of projects changes
    videoRefs.current = new Array(projects.length).fill(null);
  }, [projects.length]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentProjectIndex];
    if (currentVideo) {
      // currentVideo.load();
      currentVideo
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  }, [currentProjectIndex, projects]);

  const changeProjectIndex = useCallback(
    (change: number) => {
      setCurrentProjectIndex(
        (current) => (current + change + projects.length) % projects.length
      );
    },
    [projects.length]
  );

  const resetTimer = useCallback(() => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(
      () => changeProjectIndex(1),
      2000
    ) as NodeJS.Timeout;
  }, [changeProjectIndex]);

  // Start the auto-scroll timer when expanded or when closing sidebar
  useEffect(() => {
    if (!expanded) {
      setProjectView(false);
    }
    if (expanded && !projectView) {
      // console.log("entering category mode. setting timer!");
      resetTimer();
    } else {
      autoScrollTimer.current = null;
    }
    // Pause video if mouse is not over the video section
    if (!expanded) {
      videoRefs.current[currentProjectIndex]?.pause();
    }

    return () => {
      // Clear the timer when the component unmounts or before re-creating it
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [expanded, projectView, currentProjectIndex, resetTimer]);

  // useEffect(() => {}, [projectView]);

  // useEffect(() => {
  //   if (expanded) {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       console.log("key", e.key);
  //       if (e.key === "Escape") {
  //         onClose();
  //       }
  //     };

  //     document.addEventListener("keydown", handleKeyDown);
  //     return () => document.removeEventListener("keydown", handleKeyDown);
  //   }
  // }, [expanded, onClose]);

  function onClick() {
    if (expandedState) {
      setProjectView(!projectView);
    }
    portfolioOnClick();
  }

  const switchRight = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      console.log("switching right");
      e.stopPropagation();
      changeProjectIndex(1);
      resetTimer();
    },
    [changeProjectIndex, resetTimer]
  );

  const switchLeft = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      changeProjectIndex(-1);
      resetTimer();
    },
    [changeProjectIndex, resetTimer]
  );

  useEffect(() => {
    if (expanded) {
      const handleKeyDown = (e: KeyboardEvent) => {
        console.log("key", e.key);
        if (e.key === "ArrowLeft") {
          switchLeft(e);
        } else if (e.key === "ArrowRight") {
          switchRight(e);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [expanded, switchLeft, switchRight]);

  const handleMouseOver = () => {
    if (videoRefs.current[currentProjectIndex]) {
      videoRefs.current[currentProjectIndex]?.play();
    }
  };

  const handleMouseOut = () => {
    // keep playing if in fullscreen "reel" mode
    if (!projectView && !expanded) {
      videoRefs.current[currentProjectIndex]?.pause();
    }
  };
  // todo: pause video on unload

  return (
    <div
      className={`video-section ${projectCategory} ${expandedState}`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {expanded && (
        <>
          <button className="nav-button quit" onClick={onClose}>
            <div className="inner-button">{`x`}</div>
          </button>
          <button className="nav-button prev" onClick={switchLeft}>
            <div className="inner-button">{`<`}</div>
          </button>
          <button className="nav-button next" onClick={switchRight}>
            <div className="inner-button">{`>`}</div>
          </button>
        </>
      )}
      <div className="project-container">
        <div className="media-container">
          {projects.map((project, index) => {
            const position =
              index === currentProjectIndex
                ? "current"
                : index === (currentProjectIndex + 1) % projects.length
                ? "next"
                : index ===
                  (currentProjectIndex - 1 + projects.length) % projects.length
                ? "prev"
                : "";
            return (
              <div key={project.src} className={`media-element ${position}`}>
                {project.src.endsWith("webm") || project.src.endsWith("mp4") ? (
                  <video
                    preload={position === "current" ? "auto" : "none"}
                    key={project.src}
                    loop
                    muted
                    ref={(el) => (videoRefs.current[index] = el)}
                  >
                    <source src={`/img/${project.src}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={`/img/${project.src}`}
                    alt={project.name}
                    width={1920}
                    height={1080} // todo: determine best wiidth and height
                  />
                )}
              </div>
            );
          })}
        </div>
        {expanded && (
          <div
            className={"text-container " + (projectView ? "visible" : "hidden")}
          >
            <ProjectText
              markdownPath={`${projectCategory}/${currentProject.id}/page.mdx`}
            />
          </div>
        )}
      </div>
      {!projectView && (
        <div className="category-label-container">
          <div className="label">{projectCategory}</div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
