import React from 'react';
import Chart from './Chart';

const Calculator = () => {
  return (
    <section className="flex flex-col md:flex-row mt-10">
      <div className="flex-1">hello</div>
      <div className="flex-1">
        <Chart
          labels={[
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
          ]}
          yearlyContributions={[
            1700,
            2900,
            4100,
            5300,
            6500,
            7700,
            8900,
            10100,
            11300,
            12500,
            13700,
            14900,
            16100,
            17300,
            18500,
            19700,
            20900,
            22100,
            23300,
            24500,
            25700,
            26900,
          ]}
          yearlyInterests={[
            1730,
            3033,
            4415,
            5880,
            7433,
            9079,
            10824,
            12673,
            14634,
            16712,
            18915,
            21250,
            23725,
            26348,
            29129,
            32077,
            35201,
            38513,
            42024,
            45746,
            49691,
            53872,
          ]}
        />
      </div>
    </section>
  );
};

export default Calculator;
