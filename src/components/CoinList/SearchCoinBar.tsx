import React, {useCallback, useState} from 'react';
import {useToastStore} from '../../store/useToastStore';
import {ToastType} from '../../types/toast';
import {SearchBar} from '@rneui/themed';
import {Button, XStack} from 'tamagui';

type SearchCoinBarProps = {
  handleSearch: (input: string) => void;
  handlePressCancel: () => void;
};
export const SearchCoinBar = ({
  handleSearch,
  handlePressCancel,
}: SearchCoinBarProps) => {
  const [input, setInput] = useState('');

  const {addNotification} = useToastStore();

  const handlerSubmitSearch = useCallback(() => {
    handleSearch(input);
    addNotification('Coins have been updated', ToastType.SUCCESS);
  }, [handleSearch, input, addNotification]);

  return (
    <XStack justifyContent="space-between" alignItems="center">
      <SearchBar
        platform="android"
        placeholder="Search Cryptocurrency"
        onChangeText={setInput}
        value={input}
        placeholderTextColor={'#DFE2E4'}
        onSubmitEditing={handlerSubmitSearch}
        inputStyle={{
          height: 40,
          paddingVertical: 0,
          fontSize: 16,
          marginLeft: 0,
        }}
        containerStyle={{
          flex: 1,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#DFE2E4',
          height: 50,
        }}
        inputContainerStyle={{
          borderRadius: 5,
          marginRight: 30,
          height: 30,
        }}
        searchIcon={{
          color: '#DFE2E4',
        }}
        clearIcon={{
          color: '#DFE2E4',
        }}
        cancelIcon={{
          color: '#DFE2E4',
        }}
      />
      <Button
        size={'$4'}
        fontWeight={'bold'}
        pressStyle={{backgroundColor: 'transparent', borderWidth: 0}}
        onPress={handlePressCancel}>
        Cancel
      </Button>
    </XStack>
  );
};

export default SearchCoinBar;
