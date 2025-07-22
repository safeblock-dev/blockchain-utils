import { Network } from "ethers"
import { Address, arrayUtils } from "../index"
import AddressTypeChecks from "./address-type-checks"
import { AddressLike, AddressType, DefinedAddressLike } from "./special-addresses"

/**
 * A utility class for performing actions and comparisons on blockchain addresses.
 * Extends `AddressTypeChecks` to inherit address type detection and comparison utilities.
 */
export default class AddressActions extends AddressTypeChecks {
  /**
   * Ensures that the provided address is wrapped, returning the corresponding wrapped address if necessary.
   *
   * @param {AddressLike} address address to verify and return in wrapped format if applicable.
   * @param {Network} network network context used to determine the wrapped counterpart of a native address.
   * @return {Address} wrapped form of the provided address or the resolved equivalent.
   */
  public static requireWrapped(address: AddressLike, network: Network): Address {
    const _address = Address.from(address)

    if (_address.equalTo(Address.zeroAddress)) return Address.wrappedOf(network)

    return Address.isNative(address) ? Address.wrappedOf(network) : _address
  }

  /**
   * Checks if a given address is the same as a specified safeFromAddress, and if so,
   * returns the result of a replacer function applied to the address. If not, it returns the original address.
   *
   * @param {DefinedAddressLike} address input address to be checked and potentially replaced.
   * @param {DefinedAddressLike} replaceIf address to compare against the input address.
   * @param {(address: Address) => Address} replacer function to apply to the address if it matches the replaceIf.
   * @return {Address} original address or the result of applying the replacer function to the address.
   */
  public static replaceAddress(address: DefinedAddressLike, replaceIf: DefinedAddressLike, replacer: (address: Address) => Address): Address {
    const _address = Address.from(address)

    if (_address.equalTo(replaceIf)) return replacer(_address)

    return _address
  }

  /**
   * Checks if a given address exists in an array of addresses.
   * Performs a case-insensitive comparison by converting all addresses to lowercase strings.
   *
   * @param address - The address to check for.
   * @param array - The array of addresses to search in.
   * @returns `true` if the address is found in the array, otherwise `false`.
   */
  public static inArray(address: AddressLike, array: AddressLike[]): boolean {
    return arrayUtils.nonNullable(array.map(i => i?.toString().toLowerCase()))
      .some(a => a === address?.toString().toLowerCase())
  }

  /**
   * Checks if the first Ethereum address is less than the second Ethereum address.
   * Address values are compared numerically.
   *
   * @param addressA - The first address to compare.
   * @param addressB - The second address to compare.
   * @returns `true` if `addressA` is less than `addressB`, otherwise `false`.
   */
  public static lt(addressA: AddressLike, addressB: AddressLike): boolean {
    if (!addressA || !addressB) return false

    const addressAType = this.detectBlockchainAddressType(addressA.toString())
    const addressBType = this.detectBlockchainAddressType(addressB.toString())

    // Ensure both addresses are valid Ethereum addresses
    if (addressAType === AddressType.Unknown || addressBType === AddressType.Unknown) return false
    if (addressAType !== AddressType.Ethereum || addressBType !== addressAType) return false

    return Number(addressA) < Number(addressB)
  }

  /**
   * Checks if the first Ethereum address is greater than the second Ethereum address.
   * Address values are compared numerically.
   *
   * @param addressA - The first address to compare.
   * @param addressB - The second address to compare.
   * @returns `true` if `addressA` is greater than `addressB`, otherwise `false`.
   */
  public static gt(addressA: AddressLike, addressB: AddressLike): boolean {
    if (!addressB || !addressA) return false

    const addressAType = this.detectBlockchainAddressType(addressA.toString())
    const addressBType = this.detectBlockchainAddressType(addressB.toString())

    // Ensure both addresses are valid Ethereum addresses
    if (addressAType === AddressType.Unknown || addressBType === AddressType.Unknown) return false
    if (addressAType !== AddressType.Ethereum || addressBType !== addressAType) return false

    return Number(addressA) > Number(addressB)
  }

  /**
   * Checks if the first Ethereum address is less than or equal to the second Ethereum address.
   * Combines equality and fewer-than checks.
   *
   * @param addressA - The first address to compare.
   * @param addressB - The second address to compare.
   * @returns `true` if `addressA` is less than or equal to `addressB`, otherwise `false`.
   */
  public static lte(addressA: AddressLike, addressB: AddressLike): boolean {
    return AddressTypeChecks.equal(addressA, addressB) || AddressActions.lt(addressA, addressB)
  }

  /**
   * Checks if the first Ethereum address is greater than or equal to the second Ethereum address.
   * Combines equality and greater-than checks.
   *
   * @param addressA - The first address to compare.
   * @param addressB - The second address to compare.
   * @returns `true` if `addressA` is greater than or equal to `addressB`, otherwise `false`.
   */
  public static gte(addressA: AddressLike, addressB: AddressLike): boolean {
    return AddressTypeChecks.equal(addressA, addressB) || AddressActions.gt(addressA, addressB)
  }
}