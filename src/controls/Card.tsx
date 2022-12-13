import React from "react";
import {
  Stack,
  IStackTokens,
  Depths,
  useTheme,
  mergeStyles,
} from '@fluentui/react';

type CardProps = {};

export const Card: React.FC<CardProps> = ({ children }) => {
  const theme = useTheme();

  const cardStyle = mergeStyles({
    boxShadow: Depths.depth8,
    background: theme.palette.white,
    borderRadius: '3px',
    position: 'relative',
  });

  const cardTokens: IStackTokens = {
    padding: 's1 m',
  };

  return (
    <Stack tokens={cardTokens} className={cardStyle}>
      {children}
    </Stack>
  );
};
