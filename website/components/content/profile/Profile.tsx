import { AnimatePresence, motion } from 'framer-motion';
import React, {useState} from 'react'
import { ProfileMenu } from './ProfileMenu';
import {CgProfile } from 'react-icons/cg';

export const Profile:React.FC = () => {
  const [isOpen, toggleOpen] = useState(false)
  
  // Define a function that handles the click event
  const handleIconClick = () => {
    toggleOpen(!isOpen);
  };
  
  return (
    <div className="profile-icon" onClick={handleIconClick}>
    <CgProfile style={{fontSize: '40px'}}/>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="profile-menu"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
         <ProfileMenu />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
