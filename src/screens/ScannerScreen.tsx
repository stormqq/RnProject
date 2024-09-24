import React, {useCallback, useEffect, useState} from 'react';
import {Share} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import Clipboard from '@react-native-clipboard/clipboard';
import styled from 'styled-components/native';
import {useToastStore} from '../store/useToastStore';
import {ToastType} from '../types/toast';
import {scanText} from '../../node_modules/react-native-vc-text-recognition-module/src';
import {Worklets} from 'react-native-worklets-core';
import {displayNotification} from '../helpers/notifications';

export default function ScannerScreen() {
  const device = useCameraDevice('back');
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const {addNotification} = useToastStore();

  const handleSetScannedText = Worklets.createRunOnJS((text: string) => {
    setLastScannedCode(text);
    addNotification(`Scanned value: ${text}`, ToastType.INFO);
  });

  const frameTextProcessor = useFrameProcessor(frame => {
    'worklet';
    const {text} = scanText(frame);
    if (text && text !== lastScannedCode) {
      handleSetScannedText(text);
    }
  }, []);

  useEffect(() => {
    if (!lastScannedCode) {
      return;
    }
    displayNotification(lastScannedCode);
  }, [lastScannedCode]);

  const copyToClipboard = useCallback(() => {
    if (!lastScannedCode) {
      addNotification('No data to copy', ToastType.ERROR);
      return;
    }
    Clipboard.setString(lastScannedCode);
    addNotification('Copied to clipboard', ToastType.SUCCESS);
  }, [addNotification, lastScannedCode]);

  const shareFetchedData = useCallback(async () => {
    if (!lastScannedCode) {
      addNotification('No data to share', ToastType.ERROR);
      return;
    }
    await Share.share({message: lastScannedCode});
  }, [addNotification, lastScannedCode]);

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  return (
    <Container>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        videoHdr={false}
        enableBufferCompression={true}
        enableFpsGraph={true}
        // codeScanner={codeScanner}
        frameProcessor={frameTextProcessor}
      />
      <Footer>
        <Button onPress={copyToClipboard} mode="contained">
          COPY
        </Button>
        <Button onPress={shareFetchedData} mode="contained">
          SHARE
        </Button>
      </Footer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  bottom: 30px;
`;
