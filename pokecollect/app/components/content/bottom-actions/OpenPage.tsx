import React, { ReactNode, useContext } from 'react';
import { Button } from './Button';

interface OpenPageProps {
  children?: ReactNode;
  styling: { extra: string; color: string };
  onClick: () => void;
}

export const OpenPage: React.FC<OpenPageProps> = ({ children, styling, onClick }) => {
  return (
    <Button sm={true} color={styling.color} extraStyles={styling.extra} onClick={onClick}>
      {children}
    </Button>
  );
};
