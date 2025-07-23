import { Network } from "ethers"

// EMV networks
export const bnb = Network.from(56)

export const optimism = Network.from(10)

export const matic = Network.from(137)

export const arbitrum = Network.from(42161)

export const mainnet = Network.from(1)

export const avalanche = new Network("avalanche", 43114)

export const base = new Network("base", 8453)

export const scroll = new Network("scroll", 534352)

export const gnosis = new Network("gnosis", 100)

export const units = new Network("units", 88811)

// Pseudo networks (non-EVM)

export const tron = new Network("tron", 9900001)

export const evmNetworksList: Set<Network> = new Set([
  bnb,
  optimism,
  matic,
  arbitrum,
  mainnet,
  avalanche,
  scroll,
  gnosis,
  base
])

export const networksList: Set<Network> = new Set([
  ...evmNetworksList,
  tron,
  units
])
