import React from "react";

interface PortfolioButtonProps {
  tag: string;
  displayName?: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const PortfolioButton: React.FC<PortfolioButtonProps> = ({
  tag,
  displayName,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`btn btn-toggle ${isSelected ? "on" : "off"}`}
      onClick={(e) => {
        onClick(tag);
        e.stopPropagation();
      }}
    >
      <span className="circle"></span>
      {displayName || tag}
    </div>
  );
};

export default PortfolioButton;
