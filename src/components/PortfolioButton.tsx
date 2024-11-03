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
      className={`btn ${isSelected ? "btn-on" : "btn-off"}`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </button>
  );
};

export default PortfolioButton;
