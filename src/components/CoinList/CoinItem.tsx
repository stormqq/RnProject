import {memo, useCallback} from 'react';
import {CoinMarkets} from '../../types/coinMarkets';
import {CustomThemeType} from '../../themes/themes';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {useSettingsStore} from '../../store/useSettingsStore';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import Animated, {FadeIn, LightSpeedOutLeft} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

type CoinItemProps = {
  coin: CoinMarkets;
  index: number;
};

const CoinItem = memo(({coin, index}: CoinItemProps) => {
  const theme: CustomThemeType = useTheme();
  const {isCurrentlyShaking} = useSettingsStore();
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.navigate('Details', {id: coin.id});
  }, [coin.id]);
  const isPositive = coin.price_change_24h > 0;
  return (
    <Pressable onPress={handlePress}>
      <AnimatedContainer
        theme={theme}
        index={index}>
        <CoinInfoContainer>
          <Avatar.Image size={50} source={{uri: coin.image}} />
          <CoinDetails>
            <CoinName theme={theme}>{coin.name}</CoinName>
            <PriceText theme={theme}>{coin.symbol.toUpperCase()}</PriceText>
          </CoinDetails>
        </CoinInfoContainer>
        <RightSection>
          <PriceDynamicsImage
            source={{uri: isPositive ? 'https://i.ibb.co/5RhmFvk/priceUp.png' : 'https://i.ibb.co/0YGSKy9/price-Down.png'}}
          />
          <CoinNumbers>
            <CoinPrice theme={theme}>
              {isCurrentlyShaking ? `****` : `$${coin.current_price}`}
            </CoinPrice>
            <PriceChange isPositive={isPositive} theme={theme}>
              {isCurrentlyShaking
                ? `****`
                : `${coin.price_change_percentage_24h}`}
            </PriceChange>
          </CoinNumbers>
        </RightSection>
      </AnimatedContainer>
    </Pressable>
  );
});

export default CoinItem;

const AnimatedContainer = styled.View<{
  theme: CustomThemeType;
  index: number;
}>`
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  border-width: 0px;
  margin: 6px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: '#000';
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const CoinInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 10px;
`;

const CoinDetails = styled.View`
  gap: 5px;
`;

const CoinName = styled(Text)<{theme: CustomThemeType}>`
  font-size: 20px;
  width: 150px;
  color: ${({theme}) => theme.colors.onSurface};
`;

const PriceText = styled(Text)<{theme: CustomThemeType}>`
  color: #6c757d;
`;

const PriceChange = styled(Text)<{isPositive: boolean}>`
  color: ${({isPositive}) => (isPositive ? 'green' : 'red')};
`;

const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 160px;
`;

const CoinNumbers = styled.View`
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const CoinPrice = styled(Text)<{theme: CustomThemeType}>`
  font-size: 20px;
  color: #343a40;
`;

const PriceDynamicsImage = styled.Image`
  width: 50px;
  height: 30px;
  align-self: flex-end;
`;
