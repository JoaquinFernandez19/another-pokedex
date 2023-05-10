import React from "react";
import { Button } from "./Button";
import { GiChest } from "react-icons/gi";

export const OpenInventory: React.FC = () => {
  return (
    <Button sm={true} color={"brown"}>
      <GiChest />
    </Button>
  );
};
