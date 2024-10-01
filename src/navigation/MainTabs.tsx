import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, useTheme} from 'react-native-paper';
import SettingsScreen from '../screens/SettingsScreen';
import RewardsScreen from '../screens/RewardsScreen';
import MarketScreenNew from '../screens/MarketScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
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
        component={HomeScreen}
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
        component={MarketScreenNew}
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

export default MainTabs;
