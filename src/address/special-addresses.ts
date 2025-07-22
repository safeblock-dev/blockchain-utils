import { Network } from "ethers"
import { arbitrum, avalanche, base, bnb, gnosis, mainnet, matic, optimism, scroll, tron } from "../networks"
import selectAddress from "../utils/select-address"
import Address from "./index"

/**
 * Enum representing the types of blockchain addresses.
 */
export enum AddressType {
  /**
   * Represents a TON (The Open Network) blockchain address.
   */
  TON,

  /**
   * Represents an Ethereum (or EVM-compatible) blockchain address.
   */
  Ethereum,

  /**
   * Represents a TRON blockchain address.
   */
  Tron,

  /**
   * Represents an unknown or unsupported blockchain address type.
   */
  Unknown
}

export type AddressLike = string | { toString: () => string } | null | undefined

export type DefinedAddressLike = string | { toString: () => string }

/**
 * A class containing common special addresses used across multiple blockchains.
 */
export default class SpecialAddresses {
  /**
   * The zero address in EVM networks.
   * Commonly used to represent "null" or "empty" addresses.
   */
  public static zeroAddress = Address.from("0x0000000000000000000000000000000000000000")

  /**
   * The burn address in EVM networks.
   * Tokens sent to this address are effectively destroyed and removed from circulation.
   */
  public static evmBurnAddress = Address.from("0x000000000000000000000000000000000000dead")

  /**
   * The native token address in EVM networks.
   * Used in some protocols to represent the native currency (e.g., ETH, BNB, etc.).
   */
  public static evmNativeAddress = Address.from("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

  /**
   * The bounceable native address in TON (The Open Network).
   * This address can be used to represent Toncoin in certain contexts.
   */
  public static tonBounceableNativeAddress = Address.from("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c")

  /**
   * The zero address in the TRON blockchain.
   * Used for token burns and as a placeholder for system-level operations.
   */
  public static tronZeroAddress = Address.from("T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb")

  /**
   * The default contract creation address in TRON.
   * New smart contracts are deployed to this address before being assigned a unique address.
   */
  public static tronContractCreationAddress = Address.from("TB1rKTgnPk6MvQEqSg14U9tZW54V2mSGav")

  /**
   * Get wrapped native address of specific network
   *
   * @param {Network} network desired network
   * @returns {Address} wrapped address
   */
  public static wrappedOf(network: Network): Address {
    return Address.from(
      selectAddress(network, {
        [matic.name]: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        [mainnet.name]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        [avalanche.name]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        [arbitrum.name]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        [optimism.name]: "0x4200000000000000000000000000000000000006",
        [bnb.name]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        [tron.name]: "TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR",
        [base.name]: "0x4200000000000000000000000000000000000006",
        [scroll.name]: "0x5300000000000000000000000000000000000004",
        [gnosis.name]: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
        default: this.zeroAddress
      })
    )
  }
}