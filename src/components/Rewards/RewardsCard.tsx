import React from 'react';
import {YStack, XStack, Text, Card} from 'tamagui';

type RewardProps = {
  title: string;
  data: Data[];
};

type Data = {
  label: string;
  value: string;
};

const RewardCard = ({title, data}: RewardProps) => {
  return (
    <Card
      size="$4"
      padding="$5"
      borderRadius={18}
      backgroundColor="white"
      elevation={2}>
      <YStack gap="$4">
        <Text fontSize={24} fontWeight="bold">
          {title}
        </Text>
        {data.map((item, index) => (
          <XStack key={index} justifyContent="space-between">
            <Text fontSize={16}>{item.label}</Text>
            <Text
              fontSize={16}
              fontWeight="bold"
              color={index ? '$blue10' : '$black1'}>
              {item.value}
            </Text>
          </XStack>
        ))}
      </YStack>
    </Card>
  );
};

export default RewardCard;
