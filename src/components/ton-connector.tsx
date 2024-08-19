'use client';

import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
  useTonConnectUI,
} from '@tonconnect/ui-react';

const TonConnector = () => {
  const address = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <div className="flex flex-col gap-4">
      <TonConnectButton />

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
