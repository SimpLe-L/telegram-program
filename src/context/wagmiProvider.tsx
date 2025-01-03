'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { flowTestnet } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
// import { injected, walletConnect } from 'wagmi/connectors'
import '@rainbow-me/rainbowkit/styles.css'

// const projectId = ''
const config = createConfig({
  // chains: [mainnet, sepolia, anvil],
  chains: [flowTestnet],
  connectors: [
    // injected(),
    // metaMask(),
    // safe(),
  ],
  transports: {
    // [anvil.id]: http(),
    // [mainnet.id]: http(),
    [flowTestnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function WagmiConfigProvider(props: { children?: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
