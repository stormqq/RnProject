/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAuthStore} from './src/store/useAuthStore';
import {useThemeStore} from './src/store/useThemeStore';
import {configureGoogleSignIn} from './src/helpers/configHelpers';
import {PaperProvider, Text} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/themes/themes';
import {ToastManager} from './src/components/Other/ToastManager';
import AuthNavigation from './src/navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useLocalAuth} from './src/hooks/useLocalAuth';
import styled from 'styled-components/native';
import {createTamagui, TamaguiProvider} from 'tamagui';
import {config} from '@tamagui/config/v3';
import MainNavigation from './src/navigation/MainNavigation';

export const queryClient = new QueryClient();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

function App(): React.JSX.Element {
  const {user} = useAuthStore();
  const colorScheme = useColorScheme();
  const {currentTheme, setTheme} = useThemeStore();
  const {authenticate, localAuthError} = useLocalAuth();

  useEffect(() => {
    setTheme(colorScheme);
    configureGoogleSignIn();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        <TamaguiProvider config={tamaguiConfig}>
          <PaperProvider
            theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <NavigationContainer>
              {user ? <MainNavigation /> : <AuthNavigation />}
            </NavigationContainer>
            {localAuthError && (
              <ErrorContainer>
                <ErrorText onPress={authenticate} style={{color: 'white'}}>
                  {localAuthError}
                </ErrorText>
              </ErrorContainer>
            )}
            <ToastManager />
          </PaperProvider>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;

const ErrorContainer = styled.View`
  padding: 16px;
  align-items: center;
  background-color: 'red';
`;

const ErrorText = styled(Text)`
  color: 'white';
`;
