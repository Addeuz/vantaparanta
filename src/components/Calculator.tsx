import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { currencyFormatter } from '../utils/currencyFormatter';
import Chart from './Chart';

const Calculator = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [yearlyContributions, setYearlyContributions] = useState<number[]>([]);
  const [yearlyInterests, setYearlyInterests] = useState<number[]>([]);

  const [startingInvestment, setStartingInvestment] = useState<number>(10000);
  const [startingInvestmentInput, setStartingInvestmentInput] = useState<boolean>(false);

  const [monthlyContributions, setMonthlyContributions] = useState<number>(500);
  const [monthlyContributionsInput, setMonthlyContributionsInput] = useState<boolean>(false);

  const [years, setYears] = useState<number>(10);
  const [yearsInput, setYearsInput] = useState<boolean>(false);

  const [yearlyInterestRate, setYearlyInterestRate] = useState<number>(10);
  const [yearlyInterestRateInput, setYearlyInterestRateInput] = useState<boolean>(false);

  const resetArrays = () => {
    setLabels([]);
    setYearlyContributions([]);
    setYearlyInterests([]);
  };

  useEffect(() => {
    resetArrays();

    for (let i = 0; i < years; i++) {
      const year = i + 1;
      const yearlyInterestTemp =
        startingInvestment * Math.pow(1 + yearlyInterestRate / 100, year) +
        monthlyContributions *
          12 *
          (Math.pow(1 + yearlyInterestRate / 100, year) - 1) *
          (1 / (yearlyInterestRate / 100));
      setLabels((oldArray) => [...oldArray, `${year}`]);
      setYearlyContributions((oldArray) => [...oldArray, year * monthlyContributions * 12]);
      setYearlyInterests((oldArray) => [...oldArray, yearlyInterestTemp]);
    }
  }, [startingInvestment, monthlyContributions, years, yearlyInterestRate]);

  // useEffect(() => {
  //   console.log(labels);
  // }, [labels]);

  // useEffect(() => {
  //   console.log(yearlyContributions);
  // }, [yearlyContributions]);

  // useEffect(() => {
  //   console.log(yearlyInterests);
  // }, [yearlyInterests]);

  return (
    <section className="flex flex-col items-center justify-center lg:flex-row mt-10">
      <div>
        <h2 className="text-4xl">Se vad ränta på ränta kan göra för dig.</h2>
        <form className="mt-5" action="">
          <InputRange
            value={startingInvestment}
            setValue={setStartingInvestment}
            input={startingInvestmentInput}
            setInput={setStartingInvestmentInput}
            min={0}
            max={10000}
            step={100}
            title="Startbelopp"
          />
          <InputRange
            value={monthlyContributions}
            setValue={setMonthlyContributions}
            input={monthlyContributionsInput}
            setInput={setMonthlyContributionsInput}
            min={0}
            max={2000}
            step={100}
            title="Månadssparande"
          />
          <InputRange
            value={years}
            setValue={setYears}
            input={yearsInput}
            setInput={setYearsInput}
            min={3}
            max={40}
            step={1}
            format="år"
            title="Spartid"
          />
          <InputRange
            value={yearlyInterestRate}
            setValue={setYearlyInterestRate}
            input={yearlyInterestRateInput}
            setInput={setYearlyInterestRateInput}
            min={0}
            max={15}
            step={1}
            format="procent"
            title="Årsavkastning"
          />
        </form>
      </div>
      <Chart
        labels={labels}
        yearlyContributions={yearlyContributions}
        yearlyInterests={yearlyInterests}
        startValue={startingInvestment}
      />
    </section>
  );
};

interface IInputRange {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  input: boolean;
  setInput: Dispatch<SetStateAction<boolean>>;
  min: number;
  max: number;
  step: number;
  title: string;
  format?: 'år' | 'procent';
}

const InputRange = ({ value, setValue, input, setInput, min, max, step, title, format }: IInputRange) => {
  return (
    <div className="mb-3 flex flex-col">
      <div className="mb-1 flex justify-between items-center">
        <span className="text-xl">{title}</span>
        {!input ? (
          <button
            className="flex items-center h-8"
            onClick={(event) => {
              event.preventDefault();
              // TODO: make this turn the whole thing into an input so we can change the value ourselve
              setInput(true);
            }}
          >
            <span className="text-xl tabular-nums">
              {format === undefined ? currencyFormatter.format(value) : format === 'år' ? value : `${value} %`}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z" />
            </svg>
          </button>
        ) : (
          <div className="flex items-center h-8">
            <input
              className="appearance-none w-24 text-xl border pl-1 border-black"
              type="number"
              value={value}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!value) {
                  setValue(0);
                } else if (title === 'Spartid' && value < 3) {
                  setValue(3);
                } else {
                  setValue(value);
                }
              }}
            />
            <svg
              className="cursor-pointer"
              onClick={() => setInput(false)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
            </svg>
          </div>
        )}
      </div>
      <input
        id="startingInvestment"
        type="range"
        className="w-full focus:ring-2"
        style={{
          background: `linear-gradient(to right, #666 0%, #666 ${((value - min) / (max - min)) * 100}%, #DEE2E6 ${
            ((value - min) / (max - min)) * 100
          }%, #DEE2E6 100%)`,
        }}
        min={min}
        step={step}
        max={max}
        value={value}
        onChange={(event) => {
          setInput(false);
          setValue(parseInt(event.target.value));
        }}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          // @ts-ignore
          const { style, min, max, value } = e.target;
          style.background = `linear-gradient(to right, #666 0%, #666 ${
            ((value - min) / (max - min)) * 105
          }%, #DEE2E6 ${((value - min) / (max - min)) * 100}%, #DEE2E6 100%) !important`;
        }}
      />
    </div>
  );
};

export default Calculator;
