import { arbitrum, avalanche, base, bnb, gnosis, mainnet, matic, optimism, scroll, units } from "../networks"

/** List of the public EVM provider URLs for supported chains */
const publicNodesList: Map<string, string[]> = new Map([
  [ bnb.name, [
    "https://bsc-dataseed.bnbchain.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed2.ninicoin.io",
    "https://1rpc.io/bnb"
  ] ],
  [ units.name, [
    "https://rpc.unit0.dev"
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
    "https://arbitrum-one-rpc.publicnode.com"
  ] ],
  [ matic.name, [
    "https://polygon-rpc.com",
    "https://1rpc.io/matic",
    "https://polygon-bor-rpc.publicnode.com"
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
  ] ],
  [ gnosis.name, [
    "https://1rpc.io/gnosis",
    "https://gnosis-rpc.publicnode.com",
    "https://rpc.gnosischain.com"
  ] ],
  [ scroll.name, [
    "https://rpc.scroll.io",
    "https://1rpc.io/scroll",
    "https://scroll-rpc.publicnode.com"
  ] ]
])

export default publicNodesList
