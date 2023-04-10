import React, { useContext } from "react";
import { UserContext } from "../../context/Context";

export const ProfileMenu = () => {
  const { userName } = useContext(UserContext);
  return (
    <div className="flex flex-col gap-1 justify-center items-start pl-3">
      {userName}
    </div>
  );
};
