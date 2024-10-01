import {ChevronLeft} from '@tamagui/lucide-icons';
import React, {useCallback} from 'react';
import {
  Button,
  Image,
  Input,
  Paragraph,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import RewardCard from '../components/Rewards/RewardsCard';
import {dataReferral} from './RewardsScreen';
import BigBlueButton from '../components/Other/BigBlueButton';

const ReferFriendScreen = ({navigation}: any) => {
  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <YStack flex={1} p="$4" mt="$3">
      <XStack gap="$3" mb="$5" ai="center">
        <Button
          unstyled
          icon={<ChevronLeft size={30} />}
          onPress={handleNavigateBack}
        />
        <Text fontWeight={'bold'} fontSize="$8">
          Refer and Earn
        </Text>
      </XStack>

      <YStack gap="$2.5">
        <RewardCard title="Referral" data={dataReferral} />
        <YStack
          ai={'center'}
          padding="$5"
          borderRadius={18}
          backgroundColor="white"
          elevation={2}>
          <Image
            source={{uri: 'https://i.ibb.co/7KMQkct/refer-Reward.png'}}
            width={100}
            height={100}
          />
          <Paragraph size="$8" mt="$5" mb="$3" fontWeight={'bold'}>
            Refer and Earn Free Crytocurrency
          </Paragraph>

          <Text mb="$4" fontSize={'$5'} color={'$gray11'} textAlign="center">
            Introducing Giottus Referral 2.0. As part of this new program we
            will be giving away upto 100% of our earning from your referral. And
            it does not stop there. You get a chance to win upto 10,000 free
            tokens. Refer, like, share and Earn.
          </Text>

          <Paragraph
            alignSelf="flex-start"
            size="$6"
            mt="$5"
            mb="$2"
            fontWeight={'bold'}>
            Your Referal Link
          </Paragraph>
          <XStack mb="$4" ai={'center'} width="100%">
            <Input
              backgroundColor="white"
              bc={'$gray6'}
              br="$2"
              fontSize={'$4'}
              flex={1}
              value="https://www.giottus.com/?refcode=RRPSFAS"
              editable={false}
            />
            <Button
              position="absolute"
              size="$3"
              fontSize={'$4'}
              right={5}
              color={'white'}
              backgroundColor={'$blue11'}>
              Copy Code
            </Button>
          </XStack>
          <View alignSelf="stretch" mt="$4">
            <BigBlueButton label="SHARE NOW" />
          </View>

          <Text mt="$7" mb="$4" fontSize={'$5'} color={'$blue11'}>
            Terms and Conditions Applied
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default ReferFriendScreen;
