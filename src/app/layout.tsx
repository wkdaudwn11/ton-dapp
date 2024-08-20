import type { Metadata } from 'next';

import Providers from '@/components/providers';

import {
  dmSans,
  inter,
  roboto,
  robotoMono,
  shadowsIntoLight,
  titilliumWeb,
  pretendard,
} from './fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'TON DAPP',
  description: 'TON DAPP',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="en"
    className={`${pretendard.variable} ${inter.variable} ${roboto.variable} ${robotoMono.variable} ${dmSans.variable} ${shadowsIntoLight.variable} ${titilliumWeb.variable}`}
  >
    <body className="font-pretendard">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
