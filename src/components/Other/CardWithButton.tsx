import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

type CardWithButtonProps = {
  topicText: string;
  mainText: string;
  buttonText: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundImageStyles?: any;
  buttonAction?: () => void;
};

const CardWithButton = ({
  topicText,
  mainText,
  buttonText,
  backgroundColor,
  backgroundImage,
  backgroundImageStyles,
}: CardWithButtonProps) => {
  return (
    <InvestCard backgroundColor={backgroundColor}>
      <View>
        <TopicText>{topicText}</TopicText>
        <MainText>{mainText}</MainText>
        <CardButton>
          <InvestButtonText buttonColor={backgroundColor}>{buttonText}</InvestButtonText>
        </CardButton>
      </View>
      <BackgroundImage source={{uri: backgroundImage}} backgroundImageStyles={backgroundImageStyles} />
    </InvestCard>
  );
};

export default CardWithButton;

const InvestCard = styled.View<{backgroundColor: string}>`
  background-color: ${props => props.backgroundColor};
  padding: 20px;
  gap: 10px;
  margin: 5px 15px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

const TopicText = styled.Text`
  color: white;
  font-size: 18px;
  margin-bottom: 5px;
`;

const MainText = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 70%;
`;

const CardButton = styled.TouchableOpacity`
  background-color: white;
  width: 40%;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
`;

const InvestButtonText = styled.Text<{buttonColor: string}>`
  color: ${props => props.buttonColor};
  text-align: center;
  font-weight: bold;
`;

const BackgroundImage = styled.Image<{backgroundImageStyles: any}>`
  position: absolute;
  right: ${props => props.backgroundImageStyles.right || 0}px;
  bottom: ${props => props.backgroundImageStyles.bottom || 0}px;
  width: ${props => props.backgroundImageStyles.width || 140}px;
  height: ${props => props.backgroundImageStyles.height || 140}px;
`;
