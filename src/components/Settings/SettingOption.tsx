import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SettingsItemProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const SettingsItem = ({title, icon, onPress}: SettingsItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
        <Icon name={icon} size={24} color="#007bff" style={{marginRight: 10}} />
        <Text style={{fontSize: 16, color: '#333'}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
