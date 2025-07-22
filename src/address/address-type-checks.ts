import { Network } from "ethers"
import SpecialAddresses, { AddressLike, AddressType } from "./special-addresses"

/**
 * A utility class for performing blockchain address type checks and comparisons.
 * Extends the `SpecialAddresses` class to include additional functionality.
 */
export default class AddressTypeChecks extends SpecialAddresses {
  /**
   * Checks if the given address is a TON address.
   * @param address - The address to check.
   * @returns `true` if the address is a TON address, otherwise `false`.
   */
  public static isTon(address: AddressLike): boolean {
    if (!address) return false

    return this.detectBlockchainAddressType(address.toString()) === AddressType.TON
  }

  /**
   * Checks if the given address is an Ethereum address.
   * @param address - The address to check.
   * @returns `true` if the address is an Ethereum address, otherwise `false`.
   */
  public static isEthereum(address: AddressLike): boolean {
    if (!address) return false

    return this.detectBlockchainAddressType(address.toString()) === AddressType.Ethereum
  }

  /**
   * Checks if the given address is a TRON address.
   * @param address - The address to check.
   * @returns `true` if the address is a TRON address, otherwise `false`.
   */
  public static isTron(address: AddressLike): boolean {
    if (!address) return false

    return this.detectBlockchainAddressType(address.toString()) === AddressType.Tron
  }

  /**
   * Checks if the given address is valid in any supported blockchain.
   * @param address - The address to check.
   * @returns `true` if the address is valid, otherwise `false`.
   */
  public static isAddress(address: AddressLike): boolean {
    if (!address) return false

    return this.detectBlockchainAddressType(address.toString()) !== AddressType.Unknown
  }

  /**
   * Checks if the given address is either the native EVM address or the zero addresses.
   *
   * @param {AddressLike} address address to check, represented either as an Address object or a string.
   * @return {boolean} true if the given address is the native EVM address or the zero addresses, otherwise false.
   */
  public static isNative(address: AddressLike): boolean {
    return this.equal(SpecialAddresses._evmNativeAddress, address) || this.equal(SpecialAddresses._zeroAddress, address)
  }

  /**
   * Determines whether the given address is wrapped for the specified network.
   *
   * @param {AddressLike} address address to check.
   * @param {Network} network network on which the check is performed.
   * @return {boolean} true if the address is wrapped for the given network, otherwise false.
   */
  public static isWrapped(address: AddressLike, network: Network): boolean {
    return this.equal(SpecialAddresses._wrappedOf(network), address)
  }

  /**
   * Checks if the given address is a "zero address" in any blockchain.
   * @param address - The address to check.
   * @returns `true` if the address is a zero address, otherwise `false`.
   */
  public static isZero(address: AddressLike): boolean {
    return this.equal(address, SpecialAddresses._zeroAddress)
  }

  /**
   * Checks if the given address is a special address (zero, native token, burn, etc.).
   * @param address - The address to check.
   * @returns `true` if the address is a special address, otherwise `false`.
   */
  public static isSpecial(address: AddressLike): boolean {
    if (this.isEthereum(address)) {
      return this.equal(address, SpecialAddresses._zeroAddress) ||
        this.equal(address, SpecialAddresses._evmNativeAddress) ||
        this.equal(address, SpecialAddresses._evmBurnAddress)
    }

    return false
  }

  /**
   * Compares two addresses for equality, considering blockchain-specific rules.
   * @param addressA - The first address.
   * @param addressB - The second address.
   * @returns `true` if the addresses are equal, otherwise `false`.
   */
  public static equal(addressA: AddressLike, addressB: AddressLike): boolean {
    if (!addressA || !addressB) return false

    const typeA = this.detectBlockchainAddressType(addressA.toString())
    const typeB = this.detectBlockchainAddressType(addressB.toString())

    if (typeA !== typeB || typeA === AddressType.Unknown) return false

    if (typeA === AddressType.Ethereum) {
      // Normalize and compare Ethereum addresses
      return addressA.toString().toLowerCase() === addressB.toString().toLowerCase()
    }

    // For TON and TRON, perform a direct string comparison (trimmed)
    return addressB.toString().trim() === addressA.toString().trim()
  }

  /**
   * Detects the blockchain type of a given address.
   * @param address - The address to analyze.
   * @returns The detected blockchain type as an `AddressType` enum value.
   */
  protected static detectBlockchainAddressType(address: string): AddressType {
    // TON: Raw format (starts with '0:' and followed by 64 hex characters)
    const tonRawRegex = /^0:[a-fA-F0-9]{64}$/

    // TON: User-friendly Base64url encoded format (47 characters, starts with 'kQ', 'EQ', 'UQ', etc.)
    const tonFriendlyRegex = /^[kEU][A-Za-z0-9_-]{47}$/

    // TON: Bounceable and non-bounceable formats (Base64url with additional data)
    const tonBounceableRegex = /^[0-9a-zA-Z_-]{48,51}$/

    // EVM: 42 characters, starts with '0x' and 40 hex characters
    const evmRegex = /^0x[a-fA-F0-9]{40}$/

    // TRON: Base58 encoded, starts with 'T' and is 34 characters long
    const tronRegex = /^T[a-zA-Z1-9]{33}$/

    switch (true) {
      case tonRawRegex.test(address):
      case tonFriendlyRegex.test(address):
      case tonBounceableRegex.test(address):
        return AddressType.TON

      case evmRegex.test(address):
        return AddressType.Ethereum

      case tronRegex.test(address):
        return AddressType.Tron

      default:
        return AddressType.Unknown
    }
  }
}