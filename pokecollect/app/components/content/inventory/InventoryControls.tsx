import React from "react";

interface InventoryControlsProps {
  handleOnClick: () => void;
}

export const InventoryControls: React.FC<InventoryControlsProps> = ({
  handleOnClick,
}) => {
  return (
    <>
      <div
        className="inventory-control cursor-pointer"
        onClick={handleOnClick}
      ></div>
      <div
        className="inventory-control-2 cursor-pointer"
        onClick={handleOnClick}
      ></div>
      <div
        className="inventory-control-3 cursor-pointer"
        onClick={handleOnClick}
      ></div>
    </>
  );
};
