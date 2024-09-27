import {useRef} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useFilteredCoins} from '../../hooks/useFilteredCoins';
import CoinItem from './CoinItem';
import {queryClient} from '../../../App';
import {CoinMarkets} from '../../types/coinMarkets';

type CoinListProps = {
  filterType?: FilterType;
  searchQuery?: string;
};

type FilterType = 'all' | 'gainer' | 'loser' | 'favourites';

export const CoinList = ({filterType, searchQuery}: CoinListProps) => {
  const coins = queryClient.getQueryData<CoinMarkets[]>(['marketCoins']);
  const listRef = useRef(null);
  console.log('COIn list searchQuery', searchQuery);
  const filteredCoins = useFilteredCoins(coins!, filterType, searchQuery);
  console.log('filteredCoins', filteredCoins);
  return (
    <FlashList
      ref={listRef}
      testID="flash-list"
      data={filteredCoins}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => <CoinItem coin={item} index={index} />}
      estimatedItemSize={44}
    />
  );
};
