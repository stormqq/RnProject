import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAuthStore} from '../../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

const Lougout = () => {
  const {setUser} = useAuthStore();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button mode="contained" onPress={signOut}>
      LOGOUT
    </Button>
  );
};

export default Lougout;
