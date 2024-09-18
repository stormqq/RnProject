import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';
import ScannerScreen from '../screens/ScannerScreen';
import HomeStackScreen from './HomeStack';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderStartColor: theme.colors.onSurface,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={30}
              source={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: '',
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                borderRadius: 50,
                backgroundColor: theme.colors.secondaryContainer,
                alignItems: 'center',
                justifyContent: 'center',
                bottom: 5,
                width: 100,
                height: 60,
              }}>
              <Icon
                size={38}
                source={focused ? 'camera' : 'camera-outline'}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color, focused}) => (
            <Icon
              size={30}
              source={focused ? 'account-wrench' : 'account-wrench-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
