import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export const Profile: React.FC = () => {
  const [isOpen, toggleOpen] = useState(false);

  // Define a function that handles the click event
  const handleIconClick = () => {
    toggleOpen(!isOpen);
  };

  return (
    <div className="profile-icon" onClick={handleIconClick}>
      <img src="./hamburguer.png" />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="profile-menu"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProfileMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
