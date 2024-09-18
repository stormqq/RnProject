/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAuthStore} from './src/store/useAuthStore';
import {useThemeStore} from './src/store/useThemeStore';
import {configureGoogleSignIn} from './src/helpers/configHelpers';
import {PaperProvider} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/themes/themes';
import {ToastManager} from './src/components/Other/ToastManager';
import AuthNavigation from './src/navigation/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';

export const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const {user} = useAuthStore();
  const colorScheme = useColorScheme();
  const {currentTheme, setTheme} = useThemeStore();

  useEffect(() => {
    setTheme(colorScheme);
    configureGoogleSignIn();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PaperProvider
            theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <NavigationContainer>
              {user ? <MainNavigation /> : <AuthNavigation />}
            </NavigationContainer>
            <ToastManager />
          </PaperProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
