import React from "react";
import { Button } from "./Button";
import { GiChest } from "react-icons/gi";

export const OpenInventory: React.FC = () => {
  return (
    <Button text={""} onClick={() => {}} extraStyles={" button-54 inventory-icon py-0 px-0"} color={""}>
      <GiChest />
    </Button>
  );
};
