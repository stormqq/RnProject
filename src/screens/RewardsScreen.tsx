import React, {useCallback} from 'react';
import RewardCard from '../components/Rewards/RewardsCard';
import {YStack} from 'tamagui';
import Banner from '../components/Other/Banner';
import {useNavigation} from '@react-navigation/native';

const dataCoupons = [
  {label: 'No. of Coupons Won', value: '06'},
  {label: 'Tokens won from Spin so far', value: '08'},
  {label: 'Remaining Coupons to Spin', value: '01'},
];

export const dataReferral = [
  {label: 'Total No of referral', value: '12'},
  {label: 'Total No of Qualified referral', value: '05'},
];

const RewardsScreen = () => {
  const navigation = useNavigation();

  const handleReferNow = useCallback(() => {
    // @ts-ignore
    navigation.navigate('ReferFriend');
  }, []);

  return (
    <YStack mt="$3" px="$4" gap="$5">
      <YStack gap="$3">
        <RewardCard title="Coupons" data={dataCoupons} />
        <RewardCard title="Referral" data={dataReferral} />
      </YStack>

      <YStack gap="$3">
        <Banner
          onPress={handleReferNow}
          title="Refer and Earn"
          subtitle="Refer you Friend and Win Cryptocoins"
          buttonText="Refer Now"
          backgroundImage="https://i.ibb.co/NsM7YPD/thumbUp.png"
          styles={{
            backgroundColor: '#F59300',
            marginTop: 70,
            backgroundImageWidth: 120,
            backgroundImageHeight: 120,
          }}
        />
        <Banner
          title="Rewards"
          subtitle="Like, Share & get free coupons"
          buttonText="Share Now"
          backgroundImage="https://i.postimg.cc/Y9ZhVfZ7/like-Share.png"
          styles={{
            backgroundColor: '#9300F5',
            marginTop: 70,
            marginRight: 20,
            backgroundImageWidth: 150,
            backgroundImageHeight: 120,
          }}
        />
      </YStack>
    </YStack>
  );
};

export default RewardsScreen;
