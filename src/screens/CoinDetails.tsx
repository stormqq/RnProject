import React, {useCallback, useMemo} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Avatar, Button, IconButton, Text, useTheme} from 'react-native-paper';
import {CustomThemeType} from '../themes/themes';
import {useToastStore} from '../store/useToastStore';
import {queryClient} from '../../App';
import {CoinMarkets} from '../types/coinMarkets';
import {useFavoriteCoin} from '../hooks/useFavoriteCoin';
import {ToastType} from '../types/toast';
import {CoinPriceChart} from '../components/CoinDetails/PriceChart';
import {mockCoinData} from '../constants/coinDataMock';
import {CoinInfoRow} from '../components/CoinDetails/InfoRow';

const CoinDetails = ({route, navigation}) => {
  const {id} = route.params;
  const theme: CustomThemeType = useTheme();
  const {addNotification} = useToastStore();

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(['marketCoins'])
      ?.find(coin => coin.id === id);
  }, [id]);

  const {toggleFavorite, isFavorite} = useFavoriteCoin(coin?.id);

  const handleToggleFavorite = useCallback(async () => {
    if (!coin?.id) return;

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

  return (
    <Container theme={theme}>
      <UpperBar>
        <CoinInfo>
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <Avatar.Image size={30} source={{uri: coin?.image}} />
          <CoinName theme={theme}>{coin?.name}</CoinName>
          <IconButton
            icon={isFavorite ? 'star' : 'star-outline'}
            onPress={handleToggleFavorite}
          />
        </CoinInfo>
        <ExchangeButton textColor="#0063f5" icon={'swap-horizontal-circle'}>
          Exchange
        </ExchangeButton>
      </UpperBar>

      <About theme={theme}>
        <PriceSection>
          <CurrentPrice>₹98,509.75</CurrentPrice>
          <PriceChange>+ 1700.254 (9.77%)</PriceChange>
        </PriceSection>
      </About>

      <StyledScrollView
        contentContainerStyle={{alignItems: 'center', padding: 20, gap: 30}}>
        <StyledCoinPriceChart>
          <CoinPriceChart data={mockCoinData} />
        </StyledCoinPriceChart>

        <TimeFilters>
          {['1H', '24H', '1W', '1M', '6M', '1Y', 'All'].map(filter => (
            <TimeFilterButton key={filter} active={filter === '1H'}>
              <TimeFilterText active={filter === '1H'}>{filter}</TimeFilterText>
            </TimeFilterButton>
          ))}
        </TimeFilters>
        <Card>
          
        </Card>

        {/* <About theme={theme}>
          <CoinInfoRow
            label="Market Rank"
            value={`#${coin?.market_cap_rank}`}
          />
          <CoinInfoRow
            label="Current price"
            value={`$${coin?.current_price}`}
          />
          <CoinInfoRow
            label="Change percentage"
            value={`$${coin?.price_change_percentage_24h}`}
          />
          <CoinInfoRow label="High 24h" value={`$${coin?.high_24h}`} />
          <CoinInfoRow label="Low 24h" value={`$${coin?.low_24h}`} />
        </About> */}
      </StyledScrollView>
    </Container>
  );
};

export default CoinDetails;

const Container = styled.View<{theme: CustomThemeType}>`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const UpperBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  width: 100%;
`;

const CoinInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const CoinName = styled(Text)<{theme: CustomThemeType}>`
  font-size: 20px;
  color: ${props => props.theme.colors.onSurface};
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
`;

const StyledCoinPriceChart = styled.View`
  padding: 20px;
  overflow: hidden;
`;

const About = styled.View<{theme: CustomThemeType}>`
  border-radius: 10px;
  padding: 16px;
  width: 100%;
`;

const ExchangeButton = styled(Button)`
  background-color: #e1ecfa;
  padding: 1px 5px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const PriceSection = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

const CurrentPrice = styled.Text`
  color: #212529;
  font-size: 28px;
  font-weight: bold;
  margin-right: 12px;
`;

const PriceChange = styled.Text`
  color: #21bf73;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

const TimeFilters = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  gap: 10px;
`;

const TimeFilterButton = styled.TouchableOpacity<{active: boolean}>`
  background-color: ${props => (props.active ? '#eef6ff' : '#F8F9FA')};
  padding: 5px 15px;
  border: 1px solid #dee2e6;
  border-radius: 15px;
`;

const TimeFilterText = styled.Text<{active: boolean}>`
  color: ${props => (props.active ? '#1e90ff' : '#000')};
`;

const Card = styled.View<{
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

const CardCoinInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 10px;
`;