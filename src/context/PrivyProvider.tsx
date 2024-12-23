"use client";

import type { PrivyClientConfig } from "@privy-io/react-auth";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "viem/chains";
import { http, createConfig, WagmiProvider } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    noPromptOnSignature: false,
  },
  loginMethods: ["email", "wallet"],
  appearance: {
    showWalletLoginFirst: false,
    walletChainType: "ethereum-only",
  },
  defaultChain: sepolia,
  supportedChains: [
    sepolia,
  ],
};
const config = createConfig({
  // chains: [mainnet, sepolia, anvil],
  chains: [sepolia],
  connectors: [
    injected(),
    // metaMask(),
    // safe(),
  ],
  transports: {
    // [anvil.id]: http(),
    // [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
const PrivyProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      // @ts-ignore
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={privyConfig}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
};

export default PrivyProviderWrapper;