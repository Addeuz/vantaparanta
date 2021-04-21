import React from 'react';
import Calculator from '../components/Calculator';

// markup
const IndexPage = () => {
  return (
    <main className="text-gray-800 max-w-7xl mt-10 mx-auto w-full px-4">
      <title>Vänta på Ränta</title>
      <header className="text-center max-w-xl mx-auto">
        <div className="text-5xl">
          Vänta på <span className="font-bold">Ränta</span>
        </div>
        <div className="mt-6">
          Vänta på Ränta är en hemsida som hjälper dig räkna på hur din ränta ackumulerar på ditt sparande. Ränta på
          ränta är ett välanvänt begrepp inom investeringskretsar.
        </div>
        <div className="mt-4">
          Här under kan du räkna på vad som händer när du låter pengarna "jobba" åt dig under medan du sparar pengar.
        </div>
      </header>
      <Calculator />
    </main>
  );
};

export default IndexPage;
