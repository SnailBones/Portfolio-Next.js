// PortfolioButton.tsx
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
    <button
      type="button"
      className={`btn ${isSelected ? "btn-on" : "btn-off"}`}
      onClick={(e) => {
        onClick(tag);
        e.stopPropagation();
      }}
    >
      {displayName || tag}
    </button>
  );
};

export default PortfolioButton;
