import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../components/Projects";
import "./VideoSection.scss";

type ExpandedState = "collapsed" | "" | "expanded" | "description";

interface VideoSectionProps {
  project: Project;
  state: ExpandedState;
  onClick: () => void;
  onClose: () => void;
  animationDelay: number;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  project,
  state,
  onClick,
  onClose,
  animationDelay,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const expanded = state === "expanded" || state === "description"; // Video takes up fullscreen (or at least > 1/3 screen)
  const collapsed = state === "collapsed";

  const onClickX = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleMouseOver = () => {
    try {
      videoRef.current?.play();
    } catch (e) {
      console.error("Failed to play video.", videoRef.current, e);
    }
  };

  const handleMouseOut = () => {
    // keep playing if in fullscreen "reel" mode
    if (!expanded && videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        console.error("Failed to pause video.", videoRef.current, e);
      }
    }
  };

  useEffect(() => {
    // Pause video when closing
    if (!expanded) {
      videoRef.current?.pause();
    }
  }, [expanded]);

  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: -100 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  return (
    <motion.div
      key={project.id}
      variants={variants} // Apply variants to each child
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: animationDelay, duration: 0.5, ease: "easeInOut" }}
      className={`video-section ${collapsed ? "collapsed" : ""}`}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {expanded && (
        <>
          <button className="nav-button quit" onClick={onClickX}>
            <div className="inner-button">{`x`}</div>
          </button>
          {/* <button className="nav-button prev" onClick={onClickLeft}>
            <div className="inner-button">{`<`}</div>
          </button>
          <button className="nav-button next" onClick={onClickRight}>
            <div className="inner-button">{`>`}</div>
          </button> */}
        </>
      )}
      <div className="project-container">
        <div className="media-container">
          <div key={project.imgSrc} className={`media-element current`}>
            {project.imgSrc.endsWith("webm") ||
            project.imgSrc.endsWith("mp4") ? (
              <video
                preload="auto"
                key={project.imgSrc}
                loop
                muted
                ref={(el) => {
                  videoRef.current = el;
                }}
              >
                <source src={`/img/${project.imgSrc}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={`/img/${project.imgSrc}`}
                alt={project.name}
                width={1920}
                height={1080} // todo: determine best width and height
              />
            )}
          </div>
        </div>
      </div>
      {!collapsed && (
        <>
          <div className={"title-container" + (expanded ? " top" : "")}>
            <div className="label">{project.name}</div>
          </div>
          {state === "expanded" && (
            <div className="description-container">
              <div className="label">{project.description}</div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default VideoSection;
