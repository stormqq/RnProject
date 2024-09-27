import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import SettingsScreen from '../screens/SettingsScreen';
import HomeStackScreen from './HomeStack';
import MarketScreen from '../screens/MarketScreen';
import RewardsScreen from '../screens/RewardsScreen';

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
          paddingTop: 15,
          paddingBottom: 15,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <Icon size={35} source={'home-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          title: 'Rewards',
          tabBarIcon: ({color}) => (
            <Icon size={35} source={'gift-outline'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          title: 'Market',
          tabBarIcon: ({color}) => (
            <Icon size={35} source={'chart-line'} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon size={35} source={'account-outline'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
