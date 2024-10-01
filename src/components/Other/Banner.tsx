import React from 'react';
import {Button, Card, Image, Text} from 'tamagui';

type BannerProps = {
  onPress?: () => void;
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: string;
  styles: any;
};

const Banner = ({
  onPress,
  title,
  subtitle,
  buttonText,
  backgroundImage,
  styles,
}: BannerProps) => {
  return (
    <Card
      backgroundColor={styles.backgroundColor}
      size="$4"
      overflow="hidden"
      elevation={2}
      borderRadius={18}>
      <Card.Header gap={8}>
        <Text fontSize={16} color="white">
          {title}
        </Text>
        <Text width="$20" fontSize={24} fontWeight={'bold'} color="white">
          {subtitle}
        </Text>
      </Card.Header>

      <Card.Footer padded>
        <Button
          onPress={onPress}
          size={'$4'}
          fontWeight={'bold'}
          color={styles.backgroundColor}
          alignSelf="flex-start">
          {buttonText}
        </Button>
      </Card.Footer>

      <Card.Background>
        <Image
          source={{
            uri: backgroundImage,
          }}
          alignSelf="flex-end"
          marginTop={styles.marginTop}
          marginRight={styles.marginRight}
          marginBottom={styles.marginBottom}
          tintColor={styles.tintColor}
          width={styles.backgroundImageWidth || 220}
          height={styles.backgroundImageHeight || 200}
        />
      </Card.Background>
    </Card>
  );
};

export default Banner;
