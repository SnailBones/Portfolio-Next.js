/* eslint-disable react/no-unescaped-entities */
import "./project.scss";
export default function PlantProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-content">
      <h1>
        This page currently isn't used—projects in this directory are just
        treated as components.
      </h1>
      {children}
    </div>
  );
}
