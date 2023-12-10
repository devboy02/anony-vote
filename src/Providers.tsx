"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, optimism, mainnet, scroll, goerli } from "viem/chains";
import { SessionProvider } from "next-auth/react";
// import { LensConfig, development, LensProvider } from '@lens-protocol/react-web';
// import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

/* const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
}; */

// 1. Get projectIdo
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

// 2. Create wagmiConfig
const metadata = {
  name: "Clade Club",
  description: "Decentralized Autonomous Organization Organizator",
  url: "https://github.com/clade-club",
  icons: ["https://avatars.githubusercontent.com/u/151222307?s=200&v=4"],
};

const chains = [mainnet, arbitrum, optimism, scroll, goerli];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

const Providers = ({ children }: { children: any }) => {
  return (
    <SessionProvider>
      <WagmiConfig config={wagmiConfig}>
        {children}
        {/* <LensProvider config={lensConfig}>{children}</LensProvider> */}
      </WagmiConfig>
    </SessionProvider>
  );
};

export default Providers;
