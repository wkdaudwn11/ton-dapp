'use client';

import { useEffect, useState } from 'react';

import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import { Unity, useUnityContext } from 'react-unity-webgl';

import { shortenAddress } from '@/lib/utils';

const TonConnector = () => {
  const [balance, setBalance] = useState<string | null>(null);

  const address = useTonAddress();
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const { unityProvider } = useUnityContext({
    loaderUrl: '/game/loader.js',
    dataUrl: '/game/data.br',
    frameworkUrl: '/game/framework.js.br',
    codeUrl: '/game/wasm.br',
  });

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
        <div className="flex flex-col gap-2 w-full h-screen">
          <div className="grid grid-cols-[min-content,1fr] gap-4 px-4 pt-4">
            <span className="text-emerald-500">Address</span>
            <span className="font-bold">{shortenAddress(address)}</span>
            <span className="text-emerald-500">AppName</span>
            <span className="font-bold">{wallet.device.appName}</span>
            <span className="text-emerald-500">balance</span>
            <span className="font-bold">
              {balance ? <p>{balance} TON</p> : <p>Loading...</p>}
            </span>
          </div>

          <div className="px-4 pb-2">
            <button
              className="border w-full h-10"
              onClick={async () => await tonConnectUI.disconnect()}
            >
              disconnect
            </button>
          </div>

          <Unity unityProvider={unityProvider} className="h-screen" />
        </div>
      )}
    </>
  );
};

export default TonConnector;
