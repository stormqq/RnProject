import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {CoinList} from '../components/CoinList/CoinList';
import {Tab} from '@rneui/themed';
import {Divider, IconButton} from 'react-native-paper';
import SearchCoinBar from '../components/CoinList/SearchCoinBar';
import SelectCoinCategoryDropDown from '../components/Other/SelectCoinCategoryDropDown';

const routes = ['all', 'gainer', 'loser', 'favourites'];

const MarketScreen = () => {
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);
  console.log('searchQuery', searchQuery);

  const handleOpenSearch = useCallback(() => {
    setIsSearchOpened(true);
  }, [setIsSearchOpened]);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpened(false);
  }, [setIsSearchOpened]);

  return (
    <Container>
      <Header>
        {!isSearchOpened ? (
          <>
            <MarketStatus>
              <MarketTitle>
                Market is down <MarketRate isDown={true}>- 12.18%</MarketRate>
              </MarketTitle>
              <SubText>In the past 24 hours</SubText>
            </MarketStatus>
            <IconButton
              testID="search-button"
              icon={{
                uri: 'https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png',
              }}
              onPress={handleOpenSearch}
            />
          </>
        ) : (
          <SearchCoinBar
            handleSearch={setSearchQuery}
            handlePressCancel={handleCloseSearch}
          />
        )}
      </Header>
      {!isSearchOpened ? (
        <>
          <CoinsTypeContainer>
            <MarketTitle>Coins</MarketTitle>
            <SelectCoinCategoryDropDown />
          </CoinsTypeContainer>
          <Tab
            style={{
              marginLeft: 15,
              marginRight: 15,
            }}
            titleStyle={{
              color: 'black',
            }}
            indicatorStyle={{backgroundColor: 'black'}}
            value={index}
            onChange={setIndex}
            dense>
            <Tab.Item>All</Tab.Item>
            <Tab.Item>Gainer</Tab.Item>
            <Tab.Item>Loser</Tab.Item>
            <Tab.Item>Favourites</Tab.Item>
          </Tab>
          <Divider />
          <CoinList filterType={routes[index]} />
        </>
      ) : (
        <CoinList searchQuery={searchQuery} />
      )}
    </Container>
  );
};

export default MarketScreen;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MarketStatus = styled.View`
  flex-direction: column;
`;

const MarketTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const CoinsTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

const MarketRate = styled.Text<{isDown: boolean}>`
  font-size: 24px;
  font-weight: bold;
  color: ${props => (props.isDown ? 'red' : 'green')};
`;

const SubText = styled.Text`
  font-size: 16px;
  color: gray;
`;
