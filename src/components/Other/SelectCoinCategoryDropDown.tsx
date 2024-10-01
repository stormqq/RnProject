import {View, Text} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';

const marketValues = [{title: 'Market- INR'}, {title: 'Market- Sec'}];


const SelectCoinCategoryDropDown = () => {
  return (
    <SelectDropdown
      data={marketValues}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Market- INR'}
            </Text>
            <Icon
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      // renderItem={(item, index, isSelected) => {
      //   return (
      //     <View
      //       style={{
      //         ...styles.dropdownItemStyle,
      //         ...(isSelected && {backgroundColor: '#D2D9DF'}),
      //       }}>
      //       <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
      //     </View>
      //   );
      // }}
      // dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default SelectCoinCategoryDropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 150,
    height: 30,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#DFE2E4',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#6C757D',
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    color: '#6C757D',
  },
  dropdownButtonIconStyle: {
    fontSize: 14,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
