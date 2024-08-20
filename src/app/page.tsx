'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

import TonConnector from '@/components/ton-connector';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TonConnectUIProvider manifestUrl="https://ton-dapp-beige.vercel.app/tonconnect-manifest.json">
        <TonConnector />
      </TonConnectUIProvider>
    </main>
  );
};

export default Home;
