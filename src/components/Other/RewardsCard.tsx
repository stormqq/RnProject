import React from 'react';
import styled from 'styled-components/native';

type RewardProps = {
  title: string;
  data: Data[];
};

type Data = {
  label: string;
  value: string;
};

const RewardCard = ({title, data}: RewardProps) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      {data.map((item, index) => (
        <Row key={index}>
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
        </Row>
      ))}
    </CardContainer>
  );
};

export default RewardCard;

const CardContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  margin: 5px 15px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const CardTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #212529;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #6C757D;
`;

const Value = styled.Text`
  font-size: 16px;
  color: #007aff;
  font-weight: bold;
`;
