// ProjectText.tsx
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface ProjectTextProps {
  markdownPath: string;
  className?: string;
}

const ProjectText: React.FC<ProjectTextProps> = ({ markdownPath }) => {
  const ComponentA = dynamic(() => import(`@/app/projects/` + markdownPath));
  return (
    <div className="mdx-content">
      {/* {MDXComponent && mdxContent ? <MDXComponent /> : <p>Loading...</p>} */}
      {/* <MyMDXFile /> */}
      <ComponentA />
    </div>
  );
};

export default ProjectText;
