import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-paper';
const ProfileScreen = () => {
  return (
    <Container>
      <Header>
        <ProfileImage source={{uri: 'https://i.imgflip.com/4/4t0m5.jpg'}} />
        <UserName>Cute Doggo</UserName>
        <UserEmail>doggo1234@gmail.com</UserEmail>
        <UserPhone>+38 06611128312</UserPhone>
      </Header>

      <MenuContainer>
        <MenuItem>
          <MenuIcon name="backup-restore" size={24} />
          <MenuText>History</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuIcon name="bank" size={24} />
          <MenuText>Bank Details</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuIcon name="bell-outline" size={24} />
          <MenuText>Notifications</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuIcon name="shield-half-full" size={24} />
          <MenuText>Security</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuIcon name="help-circle-outline" size={24} />
          <MenuText>Help and Support</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <MenuIcon name="file-document-outline" size={24} />
          <MenuText>Terms and Conditions</MenuText>
          <Icon name="arrow-right" size={24} color="#ccc" />
        </MenuItem>
        <Divider />
      </MenuContainer>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  margin: 20px;
`;

const Header = styled.View`
  background-color: #007bff;
  padding: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

const UserName = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;

const UserEmail = styled.Text`
  font-size: 14px;
  color: #ffffff;
`;

const UserPhone = styled.Text`
  font-size: 14px;
  color: #ffffff;
`;

const MenuContainer = styled.View`
  margin-top: 20px;
  gap: 5px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  margin-bottom: 1px;
`;

const MenuText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: #333;
`;

const MenuIcon = styled(Icon)`
  margin-right: 10px;
  color: #007bff;
`;
