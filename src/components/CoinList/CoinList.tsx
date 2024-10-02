import {useRef} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useFilteredCoins} from '../../hooks/useFilteredCoins';
import {queryClient} from '../../../App';
import {CoinMarkets} from '../../types/coinMarkets';
import {Image, SizableText, YStack} from 'tamagui';
import CoinItem from './CoinItem';

type CoinListProps = {
  filterType?: CoinFilterType;
  searchQuery?: string;
};

export type CoinFilterType = 'all' | 'gainer' | 'loser' | 'favourites';

export const CoinList = ({filterType, searchQuery}: CoinListProps) => {
  const coins = queryClient.getQueryData<CoinMarkets[]>(['marketCoins']);
  const listRef = useRef(null);
  const filteredCoins = useFilteredCoins(coins!, filterType, searchQuery);

  return filterType === 'favourites' && filteredCoins.length !== 0 ? (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Image
        source={{
          uri: 'https://i.ibb.co/D7fR35h/empty-Favourites.png',
          width: 240,
          height: 200,
        }}
      />
      <SizableText size="$8" fontWeight={'bold'}>
        Special place for Favorite coins
      </SizableText>
      <SizableText size="$6">
        Add you favorite coins and check here easily
      </SizableText>
    </YStack>
  ) : (
    <FlashList
      ref={listRef}
      testID="flash-list"
      data={filteredCoins}
      keyExtractor={item => item.id}
      renderItem={({item}) => <CoinItem coin={item} />}
      estimatedItemSize={44}
    />
  );
};
