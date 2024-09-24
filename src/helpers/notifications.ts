import notifee from '@notifee/react-native';

export const displayNotification = async (scannedText: string) => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Text detection',
    body: `Text found: ${scannedText}`,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
};
