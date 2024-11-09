// PortfolioButton.tsx
import React from "react";

interface PortfolioButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: (tag: string) => void;
}

const PortfolioButton: React.FC<PortfolioButtonProps> = ({
  tag,
  isSelected,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={`btn ${tag === "other" ? "btn-free " : ""}${
        isSelected ? "btn-on" : "btn-off"
      }`}
      onClick={(e) => {
        onClick(tag);
        e.stopPropagation();
      }}
    >
      {tag}
    </button>
  );
};

export default PortfolioButton;
