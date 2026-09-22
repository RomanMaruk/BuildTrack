import { EChartsOption } from 'echarts';
import { IExpenseDynamics } from '../../models/chart.models';

export function expenseTrendChartOptions(data: IExpenseDynamics[]): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      data: ['UAH', 'USD'],
    },

    xAxis: {
      type: 'category',
      data: data.map((item) => item.period),
    },

    yAxis: [
      {
        type: 'value',
        name: 'Amount',
      },
      // {
      //   type: 'value',
      //   name: 'USD',
      // },
    ],

    series: [
      {
        name: 'UAH',
        type: 'line',
        yAxisIndex: 0,
        data: data.map((item) => item.uah),
        smooth: true,
      },
      {
        name: 'USD',
        type: 'line',
        yAxisIndex: 0,
        data: data.map((item) => item.usd),
        smooth: true,
      },
    ],
  };
}
