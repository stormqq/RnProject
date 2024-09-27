import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import styled from 'styled-components/native';
import {CustomThemeType} from '../../themes/themes';
import {useToastStore} from '../../store/useToastStore';
import {ToastType} from '../../types/toast';
import {SearchBar} from '@rneui/themed';

type SearchCoinBarProps = {
  handleSearch: (input: string) => void;
  handlePressCancel: () => void;
};
export const SearchCoinBar = ({
  handleSearch,
  handlePressCancel,
}: SearchCoinBarProps) => {
  const [input, setInput] = useState('');
  const theme: CustomThemeType = useTheme();

  const {addNotification} = useToastStore();

  const handlerSubmitSearch = useCallback(() => {
    handleSearch(input);
    addNotification('Coins have been updated', ToastType.SUCCESS);
  }, [handleSearch, input, addNotification]);

  return (
    <Container theme={theme}>
      {/* <StyledTextInput
        testID="search-bar"
        placeholder="Search Cryptocurrency"
        onChangeText={setInput}
        value={input}
        clearButtonMode="never"
        underlineStyle={{display: 'none'}}
        onSubmitEditing={handlerSubmitSearch}
      /> */}
      <SearchBar
        platform="android"
        placeholder="Search Cryptocurrency"
        value={input}
        onSubmitEditing={handlerSubmitSearch}
        containerStyle={{flex: 1}}
        inputContainerStyle={{backgroundColor: '#F8F9FA'}}
      />
      <Button onPress={handlePressCancel}>Cancel</Button>
    </Container>
  );
};

export default SearchCoinBar;

const Container = styled(View)<{theme: CustomThemeType}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  margin: 10px;
`;
