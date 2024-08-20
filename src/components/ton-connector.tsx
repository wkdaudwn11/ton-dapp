'use client';

import { useEffect, useState } from 'react';

import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
} from '@tonconnect/ui-react';

const TonConnector = () => {
  const [balance, setBalance] = useState<string | null>(null);

  const address = useTonAddress();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `https://testnet.toncenter.com/api/v3/account?address=${address}`,
        );
        const data = await response.json();
        const nanoBalance = data.balance;
        const tonBalance = nanoBalance / 1_000_000_000;
        setBalance(tonBalance.toFixed(4));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [address]);

  return (
    <>
      {!address && <TonConnectButton />}

      {address && wallet && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <span>Address</span>
            <span>{address}</span>
          </div>

          <div className="flex flex-col">
            <span>AppName</span>
            <span>{wallet.device.appName}</span>
          </div>

          <div className="flex flex-col">
            <span>balance</span>
            <span>{balance ? <p>{balance} TON</p> : <p>Loading...</p>}</span>
          </div>

          <button
            className="border w-full h-10"
            onClick={async () => await tonConnectUI.disconnect()}
          >
            disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default TonConnector;
