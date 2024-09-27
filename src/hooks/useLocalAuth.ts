import {useState, useEffect} from 'react';
import {AppState} from 'react-native';
import LocalAuthentication from 'rn-local-authentication';

export function useLocalAuth() {
  const [localAuthError, setLocalAuthError] = useState<string | null>(null);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      reason: 'Unlock with Biometrics',
      fallbackToPinCodeAction: true,
    });

    if (!result.success) {
      setLocalAuthError('Local authentication failed. Please try again.');
    } else {
      setLocalAuthError(null);
    }
  };

  useEffect(() => {
    // authenticate();

    // const subscription = AppState.addEventListener(
    //   'change',
    //   async nextAppState => {
    //     if (nextAppState === 'active') {
    //       authenticate();
    //     }
    //   },
    // );

    // return () => {
    //   subscription.remove();
    // };
  }, []);

  return {localAuthError, authenticate};
}
