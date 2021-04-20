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
      {/* <h1 className="mb-16 max-w-xs text-3xl font-bold">
        hihi
        <br />
        <span className="text-purple-800">— you just made a Gatsby site! </span>
        <span role="img" aria-label="Party popper emojis">
          🎉🎉🎉
        </span>
      </h1>
      <p className="mb-12">
        Edit <code className="p-1 rounded-l bg-yellow-100 text-xl text-yellow-900 font-serif">src/pages/index.js</code>{' '}
        to see this page update in real-time.{' '}
        <span role="img" aria-label="Sunglasses smiley emoji">
          😎
        </span>
      </p>
      <ul className="mb-24 pl-0">
        <li className="text-base text-purple-900 font-bold mb-6" style={{ verticalAlign: '5%' }}>
          <a
            className="text-base text-purple-900 font-bold underline"
            style={{ verticalAlign: '5%' }}
            href={`${docLink.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
          >
            {docLink.text}
          </a>
        </li>
        {links.map((link) => (
          <li key={link.url} className="font-light text-xl max-w-xl mb-8 list-disc" style={{ color: link.color }}>
            <span>
              <a
                className="text-base text-purple-900 font-bold underline"
                style={{ verticalAlign: '5%' }}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
              >
                {link.text}
              </a>
              {link.badge && (
                <span
                  className={`text-white bg-green-600 border-green-600 text-xs font-bold tracking-wide rounded-md px-1 py-1 inline-block relative ml-2 leading-none top-[-2px]`}
                  aria-label="New Badge"
                >
                  NEW!
                </span>
              )}
              <p className="text-gray-900 text-sm mt-2 mb-0 leading-tight">{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
      <img
        id="top"
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      /> */}
    </main>
  );
};

export default IndexPage;
