import dynamic from "next/dynamic";
import { projects } from "./Projects";
import { ComponentType } from "react";

interface ProjectTextProps {
  projectID: string;
  className?: string;
}

const components: { [key: string]: ComponentType } = {};
projects.forEach(
  (project) =>
    (components[project.id] = dynamic(
      () => import(`@/app/project/${project.id}/page.mdx`)
    ))
);

const ProjectText: React.FC<ProjectTextProps> = ({ projectID }) => {
  const Text = components[projectID];
  return (
    <div className="mdx-content">
      {Text ? <Text /> : <div>Project {projectID} not found.</div>}
    </div>
  );
};

export default ProjectText;
