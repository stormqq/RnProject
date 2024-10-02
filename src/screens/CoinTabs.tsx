import React from 'react';
import type {StackProps, TabLayout, TabsTabProps} from 'tamagui';
import {AnimatePresence, SizableText, Tabs, YStack, styled} from 'tamagui';
import {CoinFilterType, CoinList} from '../components/CoinList/CoinList';

const tabs: {[key: string]: CoinFilterType} = {
  tab1: 'all',
  tab2: 'gainer',
  tab3: 'loser',
  tab4: 'favourites',
};

export const CoinTabs = () => {
  const [tabState, setTabState] = React.useState<{
    currentTab: string;
    intentAt: TabLayout | null;
    activeAt: TabLayout | null;
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,
    currentTab: 'tab1',
    intentAt: null,
    prevActiveAt: null,
  });

  const setCurrentTab = (currentTab: string) =>
    setTabState({...tabState, currentTab});
  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({...tabState, intentAt});
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({...tabState, prevActiveAt: tabState.activeAt, activeAt});
  const {activeAt, intentAt, prevActiveAt, currentTab} = tabState;

  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0;
    }
    return activeAt.x > prevActiveAt.x ? -1 : 1;
  })();

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      size="$4"
      height={'100%'}
      flexDirection="column"
      activationMode="manual"
      borderRadius="$4">
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              width={intentAt.width}
              height="$0.5"
              x={intentAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              theme="active"
              active
              width={activeAt.width}
              height={6}
              x={activeAt.x}
              bottom={0}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          paddingBottom="$1.5"
          borderBottomWidth={0.5}
          pl="$2.5"
          gap="$3"
          backgroundColor="transparent">
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="tab1"
            onInteraction={handleOnInteraction}>
            <SizableText
              size={'$6'}
              color={currentTab === 'tab1' ? '#0063F5' : '$color'}>
              All
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="tab2"
            onInteraction={handleOnInteraction}>
            <SizableText
              size={'$6'}
              color={currentTab === 'tab2' ? '#0063F5' : '$color'}>
              Gainer
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="tab3"
            onInteraction={handleOnInteraction}>
            <SizableText
              size={'$6'}
              color={currentTab === 'tab3' ? '#0063F5' : '$color'}>
              Loser
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            unstyled
            paddingHorizontal="$3"
            paddingVertical="$2"
            value="tab4"
            onInteraction={handleOnInteraction}>
            <SizableText
              size={'$6'}
              color={currentTab === 'tab4' ? '#0063F5' : '$color'}>
              Favourites
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>
      </YStack>

      <AnimatePresence exitBeforeEnter custom={{direction}} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content
            value={currentTab}
            forceMount
            flex={1}
            pt="$1"
            px="$3"
            justifyContent="center">
            <CoinList filterType={tabs[currentTab]} />
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  );
};

const TabsRovingIndicator = ({
  active,
  ...props
}: {active?: boolean} & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '#0063F5',
        opacity: 1,
      })}
      {...props}
    />
  );
};

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,

  animation: '100ms',
  variants: {
    direction: {
      ':number': direction => ({
        enterStyle: {
          x: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
});
