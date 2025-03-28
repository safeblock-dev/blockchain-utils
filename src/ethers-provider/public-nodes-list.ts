import { arbitrum, avalanche, base, bnb, mainnet, matic, optimism } from "../networks"

/** List of the public EVM provider URLs for supported chains */
const publicNodesList: Map<string, string[]> = new Map([
  [ bnb.name, [
    "https://bsc-dataseed.bnbchain.org",
    "https://bsc-dataseed1.bnbchain.org",
    "https://bsc-dataseed2.bnbchain.org",
    "https://bsc-dataseed3.bnbchain.org",
    "https://bsc-dataseed4.bnbchain.org"
  ] ],
  [ optimism.name, [
    "https://mainnet.optimism.io",
    "https://1rpc.io/op",
    "https://optimism-rpc.publicnode.com"
  ] ],
  [ avalanche.name, [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://1rpc.io/avax/c",
    "https://avalanche-c-chain-rpc.publicnode.com"
  ] ],
  [ arbitrum.name, [
    "https://arb1.arbitrum.io/rpc",
    "https://1rpc.io/arb",
    "https://arbitrum.drpc.org"
  ] ],
  [ matic.name, [
    "https://polygon-rpc.com",
    "https://1rpc.io/matic",
    "https://polygon.drpc.org"
  ] ],
  [ mainnet.name, [
    "https://1rpc.io/eth",
    "https://cloudflare-eth.com",
    "https://ethereum-rpc.publicnode.com"
  ] ],
  [ base.name, [
    "https://mainnet.base.org",
    "https://1rpc.io/base",
    "https://base-rpc.publicnode.com"
  ] ]
])

export default publicNodesList
