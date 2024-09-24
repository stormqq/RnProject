import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {RefreshControl, LayoutAnimation, View} from 'react-native';
import {useMarketCoins} from '../api/marketCoins';
import {FlashList} from '@shopify/flash-list';
import {filterBySearchQuery} from '../helpers/filterBySearchQuery';
import {CoinMarkets} from '../types/coinMarkets';
import {CustomThemeType} from '../themes/themes';
import {useTheme} from 'react-native-paper';
import Animated, {LinearTransition} from 'react-native-reanimated';
import SearchCoinBar from '../components/CoinList/SearchCoinBar';
import CoinItem from '../components/CoinList/CoinItem';
import styled from 'styled-components/native';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const {data, refetch, isLoading} = useMarketCoins();
  const [coins, setCoins] = useState(data || []);

  const listRef = useRef<FlashList<number> | null>(null);

  useEffect(() => {
    if (data) {
      setCoins(data);
    }
  }, [data]);

  const filteredCoins = useMemo(
    () => filterBySearchQuery(coins, searchQuery),
    [coins, searchQuery],
  );

  const removeCoin = useCallback((id: string) => {
    setCoins((prevCoins: CoinMarkets[]) =>
      prevCoins.filter(coin => coin.id !== id),
    );
    listRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const theme: CustomThemeType = useTheme();

  const shouldUseFlashList = true;

  return (
    <SafeArea theme={theme}>
      <SearchCoinBar handleSearch={setSearchQuery} />
      {shouldUseFlashList ? (
        <FlashList
          ref={listRef}
          testID="flash-list"
          data={filteredCoins}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <CoinItem coin={item} index={index} removeCoin={removeCoin} />
          )}
          estimatedItemSize={44}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isLoading} />
          }
        />
      ) : (
        <Animated.FlatList
          data={filteredCoins}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <CoinItem coin={item} index={index} removeCoin={removeCoin} />
          )}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isLoading} />
          }
          itemLayoutAnimation={LinearTransition}
          style={{flex: 1}}
        />
      )}
    </SafeArea>
  );
}

const SafeArea = styled(View)<{theme: CustomThemeType}>`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;
