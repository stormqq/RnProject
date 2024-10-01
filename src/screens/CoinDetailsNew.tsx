import React, {useCallback, useMemo, useState} from 'react';
import {useToastStore} from '../store/useToastStore';
import {queryClient} from '../../App';
import {CoinMarkets} from '../types/coinMarkets';
import {useFavoriteCoin} from '../hooks/useFavoriteCoin';
import {ToastType} from '../types/toast';
import {
  Avatar,
  Button,
  Separator,
  SizableText,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import {
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  MoveDownLeft,
  MoveUpRight,
  Star,
  StarFull,
} from '@tamagui/lucide-icons';
import {CoinPriceChart} from '../components/CoinDetails/PriceChart';
import {mockCoinData} from '../constants/coinDataMock';
import CoinItemNew from '../components/CoinList/CoinItemNew';
import BigBlueButton from '../components/Other/BigBlueButton';
import {BottomSheet} from '../components/Other/BottomSheet';
import {Pressable} from 'react-native';

type CoinDetailsProps = {
  route: any;
  navigation: any;
};

const CoinDetailsNew = ({route, navigation}: CoinDetailsProps) => {
  const {id} = route.params;
  const {addNotification} = useToastStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(['marketCoins'])
      ?.find(coin => coin.id === id);
  }, [id]);

  const {toggleFavorite, isFavorite} = useFavoriteCoin(coin?.id);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
    setIsSheetOpen(false);
  }, [navigation]);

  const handlePressReceiveButton = useCallback(() => {
    navigation.navigate('ReceiveCoin', {id: id});
    setIsSheetOpen(false);
  }, [navigation]);

  const handleSheetOpen = useCallback(() => {
    setIsSheetOpen(true);
  }, [setIsSheetOpen]);

  const handleSheetDismiss = useCallback(() => {
    setIsSheetOpen(false);
  }, [setIsSheetOpen]);

  const handleToggleFavorite = useCallback(async () => {
    if (!coin?.id) {
      return;
    }

    await toggleFavorite();

    if (isFavorite) {
      addNotification(
        `Coin ${coin.name} removed from favorites`,
        ToastType.ERROR,
      );
    } else {
      addNotification(
        `Coin ${coin.name} added to favorites`,
        ToastType.SUCCESS,
      );
    }
  }, [coin, isFavorite, toggleFavorite, addNotification]);

  if (!coin) {
    return null;
  }

  return (
    <YStack flex={1} justifyContent="space-between">
      <YStack>
        <XStack p="$2" mt="$3" ai="center" jc="space-between">
          <XStack gap="$3" ai="center">
            <Button
              unstyled
              icon={<ChevronLeft size={30} />}
              onPress={handleNavigateBack}
            />
            <Avatar circular size="$3">
              <Avatar.Image src={coin?.image} />
              <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
            <Text fontWeight={'bold'} fontSize="$8">
              {coin?.name}
              <Text fontSize="$5"> ({coin?.symbol.toUpperCase()})</Text>
            </Text>
            <Button
              unstyled
              icon={isFavorite ? <StarFull size="$2" /> : <Star size="$2" />}
              onPress={handleToggleFavorite}
            />
          </XStack>
          <Button
            onPress={handleSheetOpen}
            p="$2"
            br={'$8'}
            color={'#0063F5'}
            fontWeight={'bold'}
            backgroundColor={'#e1ecfa'}
            icon={<ArrowRightLeft color={'#007bff'} size={18} />}>
            Exchange
          </Button>
        </XStack>

        <XStack gap="$4" p="$4">
          <SizableText size="$9" fontWeight={'bold'}>
            ₹{coin?.current_price}
          </SizableText>
          <SizableText
            size="$8"
            mb="$1"
            alignSelf="flex-end"
            color={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}
            fontWeight={'bold'}>
            {coin?.price_change_percentage_24h}%
          </SizableText>
        </XStack>

        <CoinPriceChart data={mockCoinData} />

        <XStack gap="$3" p="$4">
          {['1H', '24H', '1W', '1M', '6M', '1Y', 'All'].map(timeStamp => (
            <Button
              key={timeStamp}
              borderWidth={1}
              borderColor={'#DFE2E4'}
              px="$3"
              br={'$6'}
              fontWeight={'bold'}
              backgroundColor={'#ebeced'}>
              {timeStamp}
            </Button>
          ))}
        </XStack>
        <YStack p="$4" gap="$2">
          <CoinItemNew withChart coin={coin} />
          <XStack
            p="$5"
            ai="center"
            jc="space-between"
            elevation={1}
            borderRadius={10}
            backgroundColor={'#FFF'}>
            <SizableText size="$6" fontWeight={'bold'}>
              Transactions
            </SizableText>
            <Button unstyled icon={<ChevronRight size={30} />} />
          </XStack>
        </YStack>
      </YStack>

      <XStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        backgroundColor={'#FFF'}
        p="$4"
        gap="$4">
        <BigBlueButton flex={1} label="BUY" />
        <BigBlueButton flex={1} label="SELL" />
      </XStack>

      <BottomSheet
        points={35}
        isOpen={isSheetOpen}
        onDismiss={handleSheetDismiss}>
        <YStack flex={1}>
          <SizableText size="$8" fontWeight={'bold'}>
            Exchange
          </SizableText>
          <YStack flex={1} gap="$3" my="$5">
            <Pressable
              onPress={() => console.log('Send Crypto button pressed')}>
              <XStack gap="$2.5">
                <MoveUpRight size={'$2.5'} color={'$blue10'} />
                <YStack>
                  <SizableText size="$6" fontWeight={'bold'}>
                    Send Crypto
                  </SizableText>
                  <SizableText size="$4">
                    Send Crypto from your wallet to another wallet
                  </SizableText>
                </YStack>
              </XStack>
            </Pressable>
            <Separator borderBottomWidth="$1" alignSelf="stretch" />
            <Pressable onPress={handlePressReceiveButton}>
              <XStack gap="$2.5">
                <MoveDownLeft size={'$2.5'} color={'$blue10'} />
                <YStack>
                  <SizableText size="$6" fontWeight={'bold'}>
                    Receive Crypto
                  </SizableText>
                  <SizableText size="$4">
                    Recieve Crypto from other wallet to your wallet
                  </SizableText>
                </YStack>
              </XStack>
            </Pressable>
          </YStack>
          <BigBlueButton label="Update Market" />
        </YStack>
      </BottomSheet>
    </YStack>
  );
};

export default CoinDetailsNew;
