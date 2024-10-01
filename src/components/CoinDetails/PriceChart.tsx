import {LineChart} from 'react-native-wagmi-charts';
import {mockCoinData} from '../../constants/coinDataMock';

type PriceChartProps = {
  data: typeof mockCoinData;
};

export const CoinPriceChart = ({data}: PriceChartProps) => {
  return (
    <LineChart.Provider data={data}>
      <LineChart width={500} height={350}>
        <LineChart.Path color="#0063F5" />
        <LineChart.CursorCrosshair color="hotpink" />
      </LineChart>
    </LineChart.Provider>
  );
};
