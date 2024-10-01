import React from 'react';
import {YStack, XStack, Avatar, Text, Separator, SizableText} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthStore} from '../store/useAuthStore';
import Login from '../components/Auth/Login';

const ProfileScreen = () => {
  const {user} = useAuthStore();

  return (
    <YStack f={1} p="$4">
      <YStack
        width={400}
        height={210}
        bg="$blue10"
        p="$4"
        ai="center"
        jc="center"
        br="$4"
        mb="$3">
        {user ? (
          <>
            <Avatar circular mb="$2" size={80}>
              <Avatar.Image source={{uri: user.photo}} />
            </Avatar>
            <SizableText mb="$2" size="$8" color="$color1" fontWeight="bold">
              {user.name}
            </SizableText>
            <SizableText size="$4" color="$color1">
              {user.email}
            </SizableText>
            <SizableText size="$4" color="$color1">
              +38 9444977118
            </SizableText>
          </>
        ) : (
          <Login />
        )}
      </YStack>

      <YStack mt="$4" gap="$2.5">
        <MenuItem icon="backup-restore" text="History" />
        <Separator />
        <MenuItem icon="bank" text="Bank Details" />
        <Separator />
        <MenuItem icon="bell-outline" text="Notifications" />
        <Separator />
        <MenuItem icon="shield-half-full" text="Security" />
        <Separator />
        <MenuItem icon="help-circle-outline" text="Help and Support" />
        <Separator />
        <MenuItem icon="file-document-outline" text="Terms and Conditions" />
        <Separator />
      </YStack>
    </YStack>
  );
};

const MenuItem = ({icon, text}: {icon: string; text: string}) => (
  <XStack
    borderBottomColor={'$gray6'}
    borderBottomWidth={1}
    ai="center"
    pb="$5"
    hoverStyle={{bg: '$gray2'}}
    pressStyle={{bg: '$gray3'}}>
    <Icon name={icon} size={24} color="#007bff" />
    <Text ml="$3" f={1} fontSize="$8" color="$color">
      {text}
    </Text>
    <Icon name="arrow-right" size={24} color="#ccc" />
  </XStack>
);

export default ProfileScreen;
