import {LineChart} from 'react-native-wagmi-charts';
import {mockCoinData} from '../../constants/coinDataMock';
import {CustomThemeType} from '../../themes/themes';
import {styled, View, YStack} from 'tamagui';

type PriceChartProps = {
  data: typeof mockCoinData;
};

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

export const CoinPriceChart = ({data}: PriceChartProps) => {
  return (
    <LineChart.Provider data={data}>
      {/* <YStack gap="$1">
        <LineChart.DatetimeText
          style={{fontSize: 18, marginLeft: 14}}
          options={options}
        />
        <LineChart.PriceText
          style={{fontSize: 18, marginLeft: 14}}
          format={({value}) => {
            'worklet';
            return value && `$${value}`;
          }}
          variant="formatted"
        />
      </YStack> */}
      <LineChart width={500} height={350}>
        <LineChart.Path color="#0063F5" />
        <LineChart.CursorCrosshair color="hotpink" />
      </LineChart>
    </LineChart.Provider>
  );
};
