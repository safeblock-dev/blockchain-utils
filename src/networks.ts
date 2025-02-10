import { Network } from "ethers"

// EMV networks
export const bnb = Network.from(56)

export const optimism = Network.from(10)

export const matic = Network.from(137)

export const arbitrum = Network.from(42161)

export const mainnet = Network.from(1)

export const avalanche = new Network("avalanche", 43114)

export const base = new Network("base", 8453)

// Pseudo networks (non-EVM)

export const ton = new Network("ton", 1100)

export const tron = new Network("tron", 1000)

export const evmNetworksList: Set<Network> = new Set([
  bnb,
  optimism,
  matic,
  arbitrum,
  mainnet,
  avalanche,
  base
])

export const networksList: Set<Network> = new Set([
  ...evmNetworksList,
  ton,
  tron
])
