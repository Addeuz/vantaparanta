import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSpring, animated } from 'react-spring';
import { currencyFormatter } from '../utils/currencyFormatter';
interface IChart {
  labels: string[];
  yearlyInterests: number[];
  yearlyContributions: number[];
  startValue: number;
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

const Chart = ({ labels, yearlyInterests, yearlyContributions, startValue }: IChart) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [contributedValue, setContributedValue] = useState<number>(0);
  const [year, setYear] = useState<string>(labels[labels.length - 1]);
  const springProps = useSpring({ number: currentValue, from: { number: 0 }, config: { duration: 300 } });

  const resetNumbers = () => {
    if (yearlyInterests[0]) {
      setCurrentValue(yearlyInterests[yearlyInterests.length - 1]);
    } else {
      setCurrentValue(yearlyContributions[yearlyContributions.length - 1] + startValue);
    }
    setContributedValue(yearlyContributions[yearlyContributions.length - 1] + startValue);
    setYear(labels[labels.length - 1]);
  };

  useEffect(() => {
    resetNumbers();
  }, [labels, yearlyInterests, yearlyContributions, startValue]);

  return (
    <div className="bg-gray-600 shadow-lg w-full p-5 max-w-full lg:w-auto lg:ml-8 lg:min-w-500">
      <div className="flex flex-col text-center">
        <p className="text-white">Totalt värde</p>
        {/* animerat nummer */}

        <animated.span className="bg-gray-200 text-5xl py-8 md:text-6xl tabular-nums break-words">
          {springProps.number.to((val) => currencyFormatter.format(val))}
        </animated.span>

        <div className="flex justify-between mt-4 px-4 md:px-10">
          <div>
            <p className="mb-3 text-lg md:text-2xl text-white">Efter år</p>
            <p className="mb-3 text-lg md:text-2xl text-white">{year ? year : 0}</p>
          </div>
          <div>
            <p className="mb-3 text-lg md:text-2xl text-white">Du har bidragit med</p>
            <p className="mb-3 text-lg md:text-2xl text-white tabular-nums">
              {contributedValue ? currencyFormatter.format(contributedValue) : currencyFormatter.format(0)}
            </p>
          </div>
        </div>
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
                console.log(totalInterest);
                if (totalInterest) {
                  setCurrentValue(totalInterest);
                } else {
                  setCurrentValue(contributed + startValue);
                }
                setContributedValue(contributed + startValue);
                setYear(item[0]._index + 1);
              } else {
                resetNumbers();
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
                ticks: {
                  min: yearlyInterests[0] ? yearlyInterests[0] : yearlyContributions[0],
                  max: yearlyInterests[0]
                    ? yearlyInterests[yearlyInterests.length - 1]
                    : yearlyContributions[yearlyContributions.length - 1],
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: '#fff',
                  callback: (val: any, index: number): any => {
                    if (labels.length < 20) {
                      return val;
                    }
                    if (labels.length < 35) {
                      return index % 2 === 0 ? val : '';
                    }
                    if (labels.length < 50) {
                      return index % 3 === 0 ? val : '';
                    }
                    if (labels.length < 65) {
                      return index % 4 === 0 ? val : '';
                    }

                    // return index % 2 === 0 ? this?.getLabelForValue(val) : '';
                    return index % 10 === 0 ? val : '';
                  },
                  autoSkip: false,
                  maxRotation: 0,
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
