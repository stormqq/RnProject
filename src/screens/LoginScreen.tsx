import React from 'react';
import {useAuthStore} from '../store/useAuthStore';
import Login from '../components/Auth/Login';
import {YStack, Text} from 'tamagui';

const LoginScreen = () => {
  const {authError} = useAuthStore();

  return (
    <YStack f={1} jc="center" ai="center">
      <Text fontSize={36} fontWeight="bold" mb={20}>
        Welcome Back!
      </Text>
      <YStack w="100%" shadowRadius={1} ai="center">
        <Login />
        {authError && (
          <Text textAlign="center" fontSize={16} fontWeight="600" mt={15}>
            {authError}
          </Text>
        )}
      </YStack>
    </YStack>
  );
};

export default LoginScreen;
