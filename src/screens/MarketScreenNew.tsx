import {ChevronDown, Search} from '@tamagui/lucide-icons';
import React, {useCallback, useState} from 'react';
import {
  Button,
  RadioGroup,
  Separator,
  SizableText,
  View,
  XStack,
  YStack,
} from 'tamagui';
import {CoinTabs} from './CoinTabs';
import SearchCoinBar from '../components/CoinList/SearchCoinBar';
import {CoinList} from '../components/CoinList/CoinList';
import {BottomSheet} from '../components/Other/BottomSheet';
import {RadioGroupItemWithLabel} from '../components/Other/MarketOptions';
import BigBlueButton from '../components/Other/BigBlueButton';

const marketRate = {
  isDown: true,
  percentage: -11.17,
};

const MarketScreenNew = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [marketValue, setMarketValue] = useState('Market- INR');
  const [selectedMarketValue, setSelectedMarketValue] = useState(marketValue);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleOpenSearch = useCallback(() => {
    setIsSearchOpened(true);
  }, [setIsSearchOpened]);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpened(false);
  }, [setIsSearchOpened]);

  const handleMarketValueChange = useCallback(() => {
    setMarketValue(selectedMarketValue);
    setIsSheetOpen(false);
  }, [setMarketValue, selectedMarketValue, setIsSheetOpen]);

  const handleSheetOpen = useCallback(() => {
    setIsSheetOpen(true);
  }, [setIsSheetOpen]);

  const handleSheetDismiss = useCallback(() => {
    setIsSheetOpen(false);
  }, [setIsSheetOpen]);

  return !isSearchOpened ? (
    <YStack flex={1}>
      <XStack
        p={'$4'}
        my={30}
        alignItems="center"
        justifyContent="space-between">
        <YStack>
          <SizableText size="$9" fontWeight={'bold'}>
            Market is {marketRate.isDown ? 'down' : 'up'}{' '}
            <SizableText
              size="$9"
              fontWeight={'bold'}
              color={marketRate.isDown ? 'red' : 'green'}>
              {marketRate.percentage}%
            </SizableText>
          </SizableText>
          <SizableText size="$6">In the past 24 hours</SizableText>
        </YStack>
        <Button
          onPress={handleOpenSearch}
          size={'$2'}
          pressStyle={{opacity: 0}}
          noTextWrap
          icon={<Search size={'$2.5'} />}
        />
      </XStack>
      <XStack
        px={'$4'}
        my={12}
        alignItems="center"
        justifyContent="space-between">
        <SizableText size="$9" fontWeight={'bold'}>
          Coins
        </SizableText>
        <Button
          onPress={handleSheetOpen}
          br={'$8'}
          size={'$5'}
          bc={'$gray6'}
          px="$2.5"
          height={'$2.5'}
          iconAfter={ChevronDown}
          scaleIcon={1.2}>
          {marketValue}
        </Button>
      </XStack>

      <View flex={1}>
        <CoinTabs />
      </View>

      <BottomSheet
        points={35}
        isOpen={isSheetOpen}
        onDismiss={handleSheetDismiss}>
        <YStack>
          <RadioGroup
            aria-labelledby="Select market"
            defaultValue="Indian - INR"
            onValueChange={setSelectedMarketValue}
            name="form">
            <SizableText mb="$2" size="$8" fontWeight={'bold'}>
              Markets
            </SizableText>
            <YStack width="100%" alignItems="center" gap="$1" mb="$2.5">
              <RadioGroupItemWithLabel
                selectedValue={selectedMarketValue}
                size="$5"
                value="Indian - INR"
                label="Indian - INR"
              />
              <Separator borderBottomWidth="$1" alignSelf="stretch" />
              <RadioGroupItemWithLabel
                selectedValue={selectedMarketValue}
                size="$5"
                value="Bitcoin - BTC"
                label="Bitcoin - BTC"
              />
              <Separator borderBottomWidth="$1" alignSelf="stretch" />
              <RadioGroupItemWithLabel
                selectedValue={selectedMarketValue}
                size="$5"
                value="TetherUS - USDT"
                label="TetherUS - USDT"
              />
            </YStack>
          </RadioGroup>
          <BigBlueButton
            onPress={handleMarketValueChange}
            label="Update Market"
          />
        </YStack>
      </BottomSheet>
    </YStack>
  ) : (
    <YStack flex={1} gap="$6" px="$4" mt="$4">
      <SearchCoinBar
        handleSearch={setSearchQuery}
        handlePressCancel={handleCloseSearch}
      />
      <CoinList searchQuery={searchQuery} />
    </YStack>
  );
};

export default MarketScreenNew;
