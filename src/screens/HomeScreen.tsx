import React, {useRef} from 'react';
import {RefreshControl} from 'react-native';
import {useMarketCoins} from '../api/marketCoins';
import {FlashList} from '@shopify/flash-list';
import {useAuthStore} from '../store/useAuthStore';
import Login from '../components/Auth/Login';
import Banner from '../components/Other/Banner';
import {H3, View} from 'tamagui';
import CoinItemNew from '../components/CoinList/CoinItemNew';
import {CoinMarkets} from '../types/coinMarkets';

export default function HomeScreen() {
  const {data, refetch, isLoading} = useMarketCoins();
  const {user} = useAuthStore();
  const listRef = useRef<FlashList<CoinMarkets> | null>(null);

  return (
    <View flex={1} px="$4" pt="$4">
      <FlashList
        ref={listRef}
        testID="flash-list"
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CoinItemNew coin={item} />}
        estimatedItemSize={44}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
        ListHeaderComponent={
          <View>
            {user ? (
              <Banner
                title={`Welcome ${user.name.split(' ')[0]},`}
                subtitle="Make you first Investment today"
                buttonText="Invest Today"
                backgroundImage="https://i.ibb.co/PDSD2XN/circle.png"
                styles={{
                  backgroundColor: '#203ED6',
                  marginTop: 40,
                  tintColor: '#0045ad',
                }}
              />
            ) : (
              <Login />
            )}
            <H3 mt={32} mb={16} fontWeight={'bold'}>
              Trending Coins
            </H3>
          </View>
        }
      />
    </View>
  );
}
