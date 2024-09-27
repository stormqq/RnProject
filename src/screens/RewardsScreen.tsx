import {ScrollView} from 'react-native';
import React from 'react';
import RewardCard from '../components/Other/RewardsCard';
import CardWithButton from '../components/Other/CardWithButton';

const dataCoupons = [
  {label: 'No. of Coupons Won', value: '06'},
  {label: 'Tokens won from Spin so far', value: '08'},
  {label: 'Remaining Coupons to Spin', value: '01'},
];

const dataReferral = [
  {label: 'Total No of referral', value: '12'},
  {label: 'Total No of Qualified referral', value: '05'},
];

const RewardsScreen = () => {
  return (
    <ScrollView
      style={{
        marginTop: 10,
      }}>
      <RewardCard title="Coupons" data={dataCoupons} />
      <RewardCard title="Referral" data={dataReferral} />
      <CardWithButton
        topicText="Refer and Earn"
        mainText="Refer you Friend and Win Cryptocoins"
        buttonText="Refer Now"
        backgroundColor="#F59300"
        backgroundImage="https://i.ibb.co/NsM7YPD/thumbUp.png"
        backgroundImageStyles={{bottom: 10, right: -12}}
      />
      <CardWithButton
        topicText="Rewards"
        mainText="Like, Share & get free coupons"
        buttonText="Share Now"
        backgroundColor="#9300F5"
        backgroundImage="https://i.postimg.cc/Y9ZhVfZ7/like-Share.png"
        backgroundImageStyles={{bottom: -30, right: 0}}
      />
    </ScrollView>
  );
};

export default RewardsScreen;
