import {Switch, Text, useTheme} from 'react-native-paper';
import {useSettingsStore} from '../store/useSettingsStore';
import {useThemeStore} from '../store/useThemeStore';
import {CustomThemeType} from '../themes/themes';
import {useAuthStore} from '../store/useAuthStore';
import Lougout from '../components/Auth/Lougout';
import styled from 'styled-components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

export default function SettingsScreen() {
  const {currentTheme, toggleTheme} = useThemeStore();
  const {isShakingModeActive, setIsShakingModeActive} = useSettingsStore();
  const theme: CustomThemeType = useTheme();
  const {user, authError} = useAuthStore();

  return (
    <Container theme={theme}>
      {user && (
        <WelcomeText theme={theme}>
          Hi, <UserName>{user.name}</UserName>
        </WelcomeText>
      )}
      <SettingRow>
        <SettingLabel theme={theme}>Dark theme</SettingLabel>
        <Switch
          value={currentTheme === 'dark'}
          color="#0a7ea4"
          onValueChange={toggleTheme}
        />
      </SettingRow>
      <SettingRow>
        <SettingLabel theme={theme}>Shaking mode</SettingLabel>
        <Switch
          value={isShakingModeActive}
          color="#0a7ea4"
          onValueChange={setIsShakingModeActive}
        />
      </SettingRow>
      <AuthButtons>
        {user && <Lougout />}
        {authError && <AuthError>{authError}</AuthError>}
      </AuthButtons>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const WelcomeText = styled(Text)<{theme: CustomThemeType}>`
  font-size: 30px;
  align-self: center;
  margin: 20px;
  color: ${props => props.theme.colors.text};
`;

const UserName = styled(Text)`
  font-weight: bold;
  color: purple;
`;

const SettingRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const SettingLabel = styled(Text)<{theme: CustomThemeType}>`
  font-size: 30px;
  color: ${props => props.theme.colors.text};
`;

const AuthButtons = styled(View)`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 20px;
`;

const AuthError = styled(Text)`
  color: red;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
