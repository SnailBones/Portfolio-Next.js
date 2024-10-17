import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ProjectText from "./ProjectText";
import "./VideoSection.scss";
import { useRouter, usePathname } from "next/navigation";
import { Project } from "../components/Projects";
interface VideoSectionProps {
  project: Project;
  expandedState: string;
  portfolioOnClick: () => void;
  onClose: () => void;
}

// TODO: either enable switching path or hide arrows on project view

const VideoSection: React.FC<VideoSectionProps> = ({
  project,
  expandedState,
  portfolioOnClick,
  onClose,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projectView, setProjectView] = useState(false); // boolean
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoScrollTimer = useRef<number | NodeJS.Timeout | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const expanded = expandedState === "expanded"; // Video takes up fullscreen (or at least > 1/3 screen)
  const diminished = expandedState === "diminished";
  const currentProject = project;

  // useEffect(() => {
  //   const [_, section, project] = pathname.split("/");
  //   if (project) {
  //     // console.log("project is", project);
  //     const projectIds = projects.map((p) => p.id);
  //     const projectIndex = projectIds.indexOf(project);
  //     if (projectIndex !== -1) {
  //       setCurrentProjectIndex(projectIndex); // "Scroll" to project
  //       setProjectView(true); // Open description
  //     }
  //   } else {
  //     setProjectView(false); // Close description if path has no project
  //   }
  // }, [pathname, projects]);

  // useEffect(() => {
  //   // Adjust the array size if the number of projects changes
  //   videoRefs.current = new Array(projects.length).fill(null);
  // }, [projects.length]);

  useEffect(() => {
    const currentVideo = videoRef.current;
    console.log("currentVideo is", currentVideo);
    if (currentVideo) {
      // currentVideo.load();videoRefs
      currentVideo
        .play()
        .catch((error) => console.error("Error playing video:", error));
    }
  }, [currentProjectIndex, project]);

  // const changeProjectIndex = useCallback(
  //   (change: number) => {
  //     setCurrentProjectIndex(
  //       (current) => (current + change + projects.length) % projects.length
  //     );
  //   },
  //   [projects.length]
  // );

  // const resetTimer = useCallback(() => {
  //   if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
  //   autoScrollTimer.current = setInterval(
  //     () => changeProjectIndex(1),
  //     2000
  //   ) as NodeJS.Timeout;
  // }, [changeProjectIndex]);

  const toggleDescription = useCallback(
    (visible: boolean) => {
      // console.log("toggling description");
      // console.log("pathname is", pathname);
      // setProjectView(visible); // todo: move to useeffect
      const [_, section, project] = pathname.split("/");
      // if (visible) {
      //   router.push(`${section}/${currentProject.id}`, { scroll: false });
      //   console.log("opening, pushing", `${currentProject.id}`);
      //   // router.push(`${currentProject.id}`, { scroll: false });
      // } else {
      //   router.push(`/${section}`, { scroll: false });
      //   // router.push(`..`, { scroll: false });
      //   console.log("closing, pushing pushing /$section");
      // }
    },
    [currentProject.id, pathname, router]
  );

  // Start the auto-scroll timer when expanded or when closing description
  useEffect(() => {
    // Hide description when closing
    if (expandedState === "") {
      toggleDescription(false);
    } // else if (expanded && !projectView) {
    // resetTimer();
    // } else {
    //   autoScrollTimer.current = null;
    // }
    // Pause video if mouse is not over the video section
    if (!expanded) {
      videoRef.current?.pause();
    }

    // return () => {
    //   // Clear the timer when the component unmounts or before re-creating it
    //   if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    // };
  }, [
    expanded,
    expandedState,
    projectView,
    currentProjectIndex,
    // resetTimer,
    toggleDescription,
  ]);

  function onClick() {
    if (expandedState) {
      toggleDescription(!projectView);
    }
    portfolioOnClick();
  }

  const onClickX = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onClickLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const onClickRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (expanded) {
      const handleKeyDown = (e: KeyboardEvent) => {
        console.log("key", e.key);
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [expanded]);

  const handleMouseOver = () => {
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    // keep playing if in fullscreen "reel" mode
    if (!projectView && !expanded) {
      videoRef.current?.pause();
    }
  };
  // todo: pause video on unload

  return (
    <div
      className={`video-section ${expandedState}`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {expanded && (
        <>
          <button className="nav-button quit" onClick={onClickX}>
            <div className="inner-button">{`x`}</div>
          </button>
          <button className="nav-button prev" onClick={onClickLeft}>
            <div className="inner-button">{`<`}</div>
          </button>
          <button className="nav-button next" onClick={onClickRight}>
            <div className="inner-button">{`>`}</div>
          </button>
        </>
      )}
      <div className="project-container">
        <div className="media-container">
          <div key={project.src} className={`media-element current`}>
            {project.src.endsWith("webm") || project.src.endsWith("mp4") ? (
              <video
                preload={"auto"}
                key={project.src}
                loop
                muted
                ref={(el) => (videoRef.current = el)}
              >
                <source src={`/img/${project.src}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={`/img/${project.src}`}
                alt={project.name}
                width={1920}
                height={1080} // todo: determine best width and height
              />
            )}
          </div>
        </div>
        {expanded && (
          <div
            className={"text-container " + (projectView ? "visible" : "hidden")}
          >
            <ProjectText markdownPath={`${currentProject.id}/page.mdx`} />
          </div>
        )}
      </div>
      {!diminished && (
        <>
          <div className="category-label-container">
            <div className="label">{project.name}</div>
          </div>
          <div className="label">{project.description}</div>
        </>
      )}
    </div>
  );
};

export default VideoSection;
