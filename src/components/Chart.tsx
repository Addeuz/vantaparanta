import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { currencyFormatter } from '../utils/currencyFormatter';
import { useSpring, animated } from 'react-spring';
interface IChart {
  labels: string[];
  yearlyInterests: number[];
  yearlyContributions: number[];
}

const pointNoHoverColor: string = 'rgba(0,0,0,0)';
const pointHoverColor: string = 'rgb(205, 234, 246)';

const graphSettings = {
  pointBorderColor: pointNoHoverColor,
  pointBackgroundColor: pointNoHoverColor,
  pointHoverRadius: 7,
  pointHoverBackgroundColor: pointHoverColor,
  pointHoverBorderColor: pointHoverColor,
};

const Chart = ({ labels, yearlyInterests, yearlyContributions }: IChart) => {
  const [currentValue, setCurrentValue] = useState<number>(yearlyInterests[yearlyInterests.length - 1]);
  const springProps = useSpring({ number: currentValue, from: { number: 0 }, config: { duration: 300 } });

  return (
    <div className="bg-gray-400 p-6">
      <div className="text-center">
        {/* animerat nummer */}
        <animated.span className="bg-green-500 text-5xl text-gray-200 tabular-nums">
          {springProps.number.to((val) => currencyFormatter.format(val))}
        </animated.span>
      </div>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: 'Sparat',
              data: yearlyContributions,
              borderColor: 'rgba(0,0,0,0)',
              backgroundColor: '#93c5fd',
              ...graphSettings,
            },
            {
              label: 'Ränta intjänat',
              data: yearlyInterests,
              borderColor: 'rgba(0,0,0,0)',
              backgroundColor: '#2563EB',
              ...graphSettings,
            },
          ],
        }}
        options={{
          maintainAspectRatio: true,
          legend: {
            labels: {
              fontColor: 'rgb(229, 231, 235)',
              fontSize: 15,
            },
            color: 'rgb(229, 231, 235)',
            display: true,
            position: 'bottom',
            reverse: true,
            onClick: (e: Event) => e.stopPropagation(),
          },
          tooltips: {
            enabled: false,
          },
          animation: {
            duration: 0, // general animation time
          },
          hover: {
            animationDuration: 0,
            mode: 'index',
            intersect: false,
            onHover: (_: any, item: any[]) => {
              if (item.length) {
                const contributed = item[0]._chart.config.data.datasets[0].data[item[0]._index];
                const totalInterest = item[0]._chart.config.data.datasets[1].data[item[0]._index];
                // console.log(item, data1, data2);
                // setDataOne(data1);
                setCurrentValue(totalInterest);
              } else {
                setCurrentValue(yearlyInterests[yearlyInterests.length - 1]);
              }
            },
          },
          scales: {
            yAxes: [
              {
                display: false,
                gridLines: {
                  drawBorder: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: '#fff',
                  callback: (val: any, index: number): any => {
                    // return index % 2 === 0 ? this?.getLabelForValue(val) : '';
                    return index % 2 === 0 ? val : '';
                  },
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Chart;
