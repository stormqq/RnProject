import {ChevronLeft} from '@tamagui/lucide-icons';
import React, {useCallback, useMemo} from 'react';
import {
  Avatar,
  Button,
  Image,
  Input,
  Paragraph,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import BigBlueButton from '../components/Other/BigBlueButton';
import {queryClient} from '../../App';
import {CoinMarkets} from '../types/coinMarkets';

const ReceiveCoin = ({route, navigation}: any) => {
  const {id} = route.params;
  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(['marketCoins'])
      ?.find(coin => coin.id === id);
  }, [id]);

  if (!coin) {
    return null;
  }

  return (
    <YStack flex={1} p="$4" mt="$3">
      <XStack gap="$3" mb="$5" ai="center">
        <Button
          unstyled
          icon={<ChevronLeft size={30} />}
          onPress={handleNavigateBack}
        />
        <Text fontWeight={'bold'} fontSize="$8">
          Receive {coin.name}
        </Text>
      </XStack>

      <YStack
        ai={'center'}
        padding="$3"
        borderRadius={18}
        backgroundColor="white"
        elevation={2}>
        <Avatar my="$3" circular size={80}>
          <Avatar.Image source={{uri: coin.image}} />
        </Avatar>

        <Paragraph size="$7" mt="$4" mb="$5" fontWeight={'bold'}>
          Scan the QR code to get Receive address
        </Paragraph>

        <Image
          source={{uri: 'https://i.ibb.co/t8B1jFs/qrcode.png'}}
          width={180}
          height={180}
        />

        <XStack my="$4" ai={'center'} gap="$2">
          <Separator borderBottomWidth="$1" />
          <Text color="$gray9">or</Text>
          <Separator borderBottomWidth="$1" />
        </XStack>

        <Paragraph size="$7" mt="$5" mb="$3" fontWeight={'bold'}>
          Your {coin.name} Address
        </Paragraph>
        <XStack mb="$4" ai={'center'}>
          <Input
            backgroundColor="white"
            bc={'$gray6'}
            br="$2"
            fontSize={'$5'}
            flex={1}
            value="https://www.giottus.com/?refcode=RRPSFAS"
            editable={false}
          />
        </XStack>

        <Button mb="$4" backgroundColor="$blue4" bc="$blue10" bw="$1">
          Copy Address
        </Button>
      </YStack>

      <Text
        mt="$7"
        mb="$4"
        fontSize={'$5'}
        color={'$blue11'}
        alignSelf="center">
        Terms and Conditions Applied
      </Text>

      <View alignSelf="stretch" mt="$4">
        <BigBlueButton label="SHARE ADDRESS" />
      </View>
    </YStack>
  );
};

export default ReceiveCoin;
