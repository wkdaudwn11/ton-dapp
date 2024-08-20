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
  const rawAddress = useTonAddress(false);
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
    <div className="flex flex-col gap-4">
      {!address && <TonConnectButton />}

      {address && wallet && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[min-content,1fr] gap-0 border border-gray-300">
            <span className="border border-gray-300 p-2">Address</span>
            <span className="border border-gray-300 p-2">{address}</span>
            <span className="border border-gray-300 p-2">RawAddress</span>
            <span className="border border-gray-300 p-2">{rawAddress}</span>
            <span className="border border-gray-300 p-2">Device</span>
            <span className="border border-gray-300 p-2">
              {wallet.device.appName}
            </span>
            <span className="border border-gray-300 p-2">balance</span>
            <span className="border border-gray-300 p-2">
              {balance ? <p>{balance} TON</p> : <p>Loading...</p>}
            </span>
          </div>
          <button
            className="border w-full h-10"
            onClick={async () => await tonConnectUI.disconnect()}
          >
            disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default TonConnector;
