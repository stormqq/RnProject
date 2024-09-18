import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '99635564639-85o4a8euoga58j8ar9l2rb4nm62jjoud.apps.googleusercontent.com',
  });
};
