import React from 'react';
import {Button, SizeTokens} from 'tamagui';

type BigBlueButtonProps = {
  label: string;
  onPress?: () => void;
  size?: SizeTokens;
  backgroundColor?: string;
  flex?: number;
  color?: string;
};

const BigBlueButton = ({
  label,
  onPress,
  size = '$6',
  backgroundColor = '#0063F5',
  flex,
  color = 'white',
}: BigBlueButtonProps) => {
  return (
    <Button
      flex={flex}
      backgroundColor={backgroundColor}
      color={color}
      size={size}
      br="$3"
      fontWeight="bold"
      onPress={onPress}>
      {label}
    </Button>
  );
};

export default BigBlueButton;
