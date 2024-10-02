import {memo} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Text} from 'tamagui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TOAST_COLORS, ToastType} from '../../types/toast';
import {YStack} from 'tamagui';

type ToastProps = {
  id: number;
  index: number;
  onRemove: (id: number) => void;
  text: string;
  type: ToastType;
};

export const Toast = memo(({id, index, onRemove, text, type}: ToastProps) => {
  const offsetX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}],
  }));

  const handleGesture = (event: {nativeEvent: {translationX: number}}) => {
    const {translationX} = event.nativeEvent;
    if (translationX < -100) {
      offsetX.value = withSpring(-500);
      setTimeout(() => onRemove(id), 300);
    } else {
      offsetX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            bottom: 95 + index * 60,
            left: 60,
            right: 60,
            zIndex: 999,
          },
        ]}>
        <YStack
          backgroundColor={TOAST_COLORS[type]}
          borderRadius="$2"
          padding="$3"
          justifyContent="center"
          alignItems="center">
          <Text color="white" fontWeight="bold">
            {text}
          </Text>
        </YStack>
      </Animated.View>
    </PanGestureHandler>
  );
});
