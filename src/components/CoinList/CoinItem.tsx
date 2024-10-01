import React, {useCallback} from 'react';
import {Avatar, Image, Text, XStack, YStack} from 'tamagui';
import {CoinMarkets} from '../../types/coinMarkets';
import {useNavigation} from '@react-navigation/native';

const CoinItem = ({
  coin,
  withChart,
}: {
  coin: CoinMarkets;
  withChart?: boolean;
}) => {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Details', {id: coin.id});
  }, [coin.id]);

  return (
    <XStack
      onPress={handlePress}
      elevation={1}
      borderRadius={10}
      backgroundColor={'$background'}
      p="$4"
      alignItems="center"
      justifyContent="space-between"
      my="$1.5">
      <XStack gap={12}>
        <Avatar circular size={50}>
          <Avatar.Image source={{uri: coin.image}} />
        </Avatar>
        <YStack>
          <Text fontSize={20} fontWeight={'bold'}>
            {coin.name.length > 15
              ? coin.name.slice(0, 15 - 3) + '...'
              : coin.name}
          </Text>
          <Text>{coin.symbol.toUpperCase()}</Text>
        </YStack>
      </XStack>

      <XStack alignItems="center" gap={24}>
        {!withChart && (
          <Image
            source={{
              uri:
                coin.price_change_24h > 0
                  ? 'https://i.ibb.co/5RhmFvk/priceUp.png'
                  : 'https://i.ibb.co/0YGSKy9/price-Down.png',
              width: 55,
              height: 35,
            }}
          />
        )}
        <YStack width={100} alignItems="flex-start">
          <Text fontSize={20} fontWeight={'bold'}>
            ${coin.current_price.toFixed(1)}
          </Text>
          <Text
            color={coin.price_change_24h > 0 ? 'red' : 'green'}
            fontWeight={'bold'}>
            {coin.price_change_percentage_24h}%
          </Text>
        </YStack>
      </XStack>
    </XStack>
  );
};

export default CoinItem;
