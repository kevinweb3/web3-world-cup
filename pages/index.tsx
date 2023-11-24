import {
  WagmiConfig,
  createConfig,
  mainnet,
  configureChains,
  useAccount,
} from 'wagmi'
import {
  ConnectKitProvider,
  ConnectKitButton,
} from 'connectkit'
import { publicProvider } from 'wagmi/providers/public'
import { ConnectInfo } from './conponents/Connect'
import { Play } from './conponents/Play'
import { Finalize } from './conponents/Finalize'
import { ClaimReward } from './conponents/ClaimReward'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Component } from 'react'

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

export default function Home() {
  return (
      <main className="flex flex-col h-screen items-center border">
        <WagmiConfig config={config}>
          <div className='w-full flex justify-end bg-white p-2 px-40'>
            <ConnectKitProvider>
              <ConnectKitButton />
            </ConnectKitProvider>
          </div>
            
          <div className='my-40 px-40 w-8/12'>
            <Play />
            <Finalize />
            <ClaimReward />
          </div>
        </WagmiConfig>
      </main>
  )
}
