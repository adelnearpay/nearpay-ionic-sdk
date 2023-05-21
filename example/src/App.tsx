import React, { useRef, useState } from 'react';
import { EmbededNearpay } from 'ionic-nearpay-sdk';
import { AuthenticationType } from 'ionic-nearpay-sdk';
import { Environments } from 'ionic-nearpay-sdk';
import { Locale } from 'ionic-nearpay-sdk';

console.log('=-=-=-=-=-=-=-=-==- before');

const nearpay = new EmbededNearpay({
  authtype: AuthenticationType.email,
  authvalue: 'f.alhajeri@nearpay.io',
  environment: Environments.sandbox,
  locale: Locale.default,
});

console.log('=-=-=-=-=-=-=-=-==- after');

export default function App() {
  const [textArr, setTextArr] = useState<string[]>(['no data yet']);
  const nearpayRef = useRef<EmbededNearpay | null>(null);

  function addText(str: string) {
    setTextArr(old => [...old, str]);
  }

  return (
    <div>
      <h3>
        {textArr.map((t, i) => (
          <div key={i}>{t}</div>
        ))}
      </h3>

      <button
        onClick={() => {
          // nearpayRef.current = new EmbededNearpay({
          //   authtype: AuthenticationType.email,
          //   authvalue: 'f.alhajeri@nearpay.io',
          //   environment: Environments.sandbox,
          //   locale: Locale.default,
          // });
          // nearpay.purchase({
          //   amount: 1000,
          //   onPurchaseSuccess: reciepts => {
          //     console.log(
          //       '=-=-=-=-=-=-=-=-=-=-=-=-= purchase success =-=-=-=-=-=-=-=-=-=-=-=-=',
          //     );
          //     addText(JSON.stringify(reciepts));
          //   },
          //   onPurchaseFailed: err => {
          //     addText(JSON.stringify(err));
          //   },
          // });
        }}
      >
        Click Me
      </button>
      <button
        onClick={() => {
          console.log('=-=-=-=-= start on js =-=-=-=-=-');

          nearpay.purchase({
            amount: 1000,
            onPurchaseSuccess: reciepts => {
              console.log(
                '=-=-=-=-=-=-=-=-=-=-=-=-= purchase success =-=-=-=-=-=-=-=-=-=-=-=-=',
              );
              addText(JSON.stringify(reciepts));
            },
            onPurchaseFailed: err => {
              addText(JSON.stringify(err));
            },
          });
        }}
      >
        test
      </button>
    </div>
  );
}
