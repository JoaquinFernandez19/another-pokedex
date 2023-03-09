import React from "react";
import { Pokemon } from "../../Types";
import { motion } from "framer-motion";

type InfoBadgeProps  = Pokemon;
 


export const InfoBadge: React.FC<InfoBadgeProps> = ({
  color,
}) => {
  return (
    <span style={{ backgroundColor: color }} className="px-2 text-xs pt-[2px]">
      Info
      
    </span>
  );
};
