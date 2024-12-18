import { arbitrum, avalanche, bnb, mainnet, matic, optimism } from "../networks"

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
    "https://rpc.ankr.com/optimism",
    "https://1rpc.io/op"
  ] ],
  [ avalanche.name, [
    "https://api.avax.network/ext/bc/C/rpc",
    "https://1rpc.io/avax/c",
    "https://rpc.ankr.com/avalanche",
    "https://avalanche.public-rpc.com",
    "https://avalanche-c-chain-rpc.publicnode.com"
  ] ],
  [ arbitrum.name, [
    "https://arb1.arbitrum.io/rpc",
    "https://rpc.ankr.com/arbitrum",
    "https://1rpc.io/arb",
    "https://arbitrum.drpc.org"
  ] ],
  [ matic.name, [
    "https://polygon-rpc.com",
    "https://rpc.ankr.com/polygon",
    "https://1rpc.io/matic",
    "https://polygon.drpc.org"
  ] ],
  [ mainnet.name, [
    "https://1rpc.io/eth",
    "https://rpc.ankr.com/eth",
    "https://cloudflare-eth.com"
  ] ]
])

export default publicNodesList
