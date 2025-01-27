import React from 'react';
import { icons, LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: keyof typeof icons;
  color?: string;
  size?: string | number;
}

const Icon: React.FC<IconProps> = ({ name, color, size = 24, ...rest }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} {...rest} />;
};

// icon search - https://lucide.dev/icons/
export default Icon;
