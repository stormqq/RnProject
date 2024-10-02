import type {SizeTokens} from 'tamagui';
import {Label, RadioGroup, Text, XStack} from 'tamagui';

export function RadioGroupItemWithLabel({
  selectedValue,
  size,
  value,
  label,
}: {
  selectedValue: string;
  size: SizeTokens;
  value: string;
  label: string;
}) {
  const id = `radiogroup-${value}`;
  return (
    <XStack
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      gap="$4">
      <Label size={size} htmlFor={id}>
        <Text
          color={selectedValue === value ? '$blue10' : '$color11'}
          fontWeight={'bold'}>
          {label}
        </Text>
      </Label>
      <RadioGroup.Item value={value} id={id} size={size} bordered={2}>
        <RadioGroup.Indicator scale={2.5} backgroundColor={'$blue10'} />
      </RadioGroup.Item>
    </XStack>
  );
}
