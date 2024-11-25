import { Network } from "ethers"

// EMV networks
export const bnb = Network.from(56)

export const optimism = Network.from(10)

export const matic = Network.from(137)

export const arbitrum = Network.from(42161)

export const mainnet = Network.from(1)

export const avalanche = new Network("avalanche", 43114)

// Pseudo networks (non-EVM)

export const ton = new Network("ton", 9990001)

export const tron = new Network("tron", 9990002)

export const evmNetworksList: Set<Network> = new Set([
  bnb,
  optimism,
  matic,
  arbitrum,
  mainnet,
  avalanche
])

export const networksList: Set<Network> = new Set([
  ...evmNetworksList,
  ton,
  tron
])
