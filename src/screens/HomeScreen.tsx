import React, {useRef} from 'react';
import {RefreshControl, View} from 'react-native';
import {useMarketCoins} from '../api/marketCoins';
import {FlashList} from '@shopify/flash-list';
import {CustomThemeType} from '../themes/themes';
import {useTheme} from 'react-native-paper';
import CoinItem from '../components/CoinList/CoinItem';
import styled from 'styled-components/native';
import CardWithButton from '../components/Other/CardWithButton';
import {useAuthStore} from '../store/useAuthStore';
import Login from '../components/Auth/Login';

export default function HomeScreen() {
  const {data, refetch, isLoading} = useMarketCoins();
  const {user} = useAuthStore();

  const listRef = useRef<FlashList<number> | null>(null);

  const theme: CustomThemeType = useTheme();

  return (
    <SafeArea theme={theme}>
      {user ? (
        <CardWithButton
          topicText={`Welcome, ${user.name.split(' ')[0]}`}
          mainText="Make you first Investment today"
          buttonText="Invest Today"
          backgroundColor="#0063f5"
          backgroundImage="https://i.ibb.co/PDSD2XN/circle.png"
          backgroundImageStyles={{bottom: 0, right: 0}}
        />
      ) : (
        <Login />
      )}
      <TrendingTitle>Trending Coins</TrendingTitle>
      <FlashList
        ref={listRef}
        testID="flash-list"
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => <CoinItem coin={item} index={index} />}
        estimatedItemSize={44}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
      />
    </SafeArea>
  );
}

const SafeArea = styled(View)<{theme: CustomThemeType}>`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  margin-top: 10px;
`;

const TrendingTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  margin: 30px 15px 10px 15px;
`;
