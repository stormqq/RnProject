import {useMemo} from 'react';
import {CoinMarkets} from '../types/coinMarkets';
import {filterBySearchQuery} from '../helpers/filterBySearchQuery';
import {useFavoriteCoin} from './useFavoriteCoin';

export const useFilteredCoins = (
  coins: CoinMarkets[],
  filterType?: string,
  searchQuery?: string,
) => {
  const {favorites} = useFavoriteCoin();
  console.log('favorites', favorites);
  return useMemo(() => {
    const filteredBySearch = searchQuery
      ? filterBySearchQuery(coins, searchQuery)
      : coins;

    console.log('filteredBySearch', filteredBySearch);
    switch (filterType) {
      case 'gainer':
        return filteredBySearch.filter(coin => coin.price_change_24h > 0);
      case 'loser':
        return filteredBySearch.filter(coin => coin.price_change_24h < 0);
      case 'favourites':
        return filteredBySearch.filter(coin => favorites.includes(coin.id));
      default:
        return filteredBySearch;
    }
  }, [coins, filterType, searchQuery, favorites]);
};
