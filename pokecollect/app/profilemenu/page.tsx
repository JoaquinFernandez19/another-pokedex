import React, { Suspense } from 'react';
import { Menu } from './content/Menu';

export default function ProfileMenu() {
  return (
    <div className="profile-menu relative z-50 min-w-fit m-auto">
      <Menu />
    </div>
  );
}
