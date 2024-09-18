import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {useAuthStore} from '../../store/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const Login = () => {
  const {setUser, setAuthError} = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '99635564639-85o4a8euoga58j8ar9l2rb4nm62jjoud.apps.googleusercontent.com',
    });
  }, []);

  const navigation = useNavigation();

  const signIn = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const response = await GoogleSignin.signIn();
    //   console.log('response', response);
    //   if (isSuccessResponse(response)) {
    //     setUser(response.data?.user);
    //     // router.replace("./home");
    //     navigation.navigate('Home');
    //   } else {
    //     setAuthError('Sign in error');
    //   }
    // } catch (error) {
    //   if (isErrorWithCode(error)) {
    //     setAuthError(error.code + ': ' + error.message);
    //   }
    // }
    setUser({name: 'Test'});
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      style={{alignSelf: 'center'}}
      onPress={signIn}
    />
  );
};

export default Login;
