import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuthStore} from '../store/useAuthStore';
import LoginScreen from '../screens/LoginScreen';
import MainTabs from './MainTabs';
import ReferFriendScreen from '../screens/ReferFriendScreen';
import ReceiveCoin from '../screens/ReceiveCoin';
import CoinDetails from '../screens/CoinDetails';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const {user} = useAuthStore();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen
          name="Auth"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={CoinDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReferFriend"
            component={ReferFriendScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ReceiveCoin"
            component={ReceiveCoin}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
