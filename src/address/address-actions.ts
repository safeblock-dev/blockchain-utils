import { AddressLike } from "ethers"
import Address from "../address"
import AddressTypeChecks from "./address-type-checks"
import { AddressType } from "./special-addresses"

/**
 * A utility class for performing actions and comparisons on blockchain addresses.
 * Extends `AddressTypeChecks` to inherit address type detection and comparison utilities.
 */
export default class AddressActions extends AddressTypeChecks {
  /**
   * Checks if a given address exists in an array of addresses.
   * Performs a case-insensitive comparison by converting all addresses to lowercase strings.
   *
   * @param address - The address to check for.
   * @param array - The array of addresses to search in.
   * @returns `true` if the address is found in the array, otherwise `false`.
   */
  public static inArray(address: Address | string, array: (string | Address)[]): boolean {
    return array.map(i => i.toString().toLowerCase()).includes(address.toString().toLowerCase())
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
    const addressAType = this.detectBlockchainAddressType(addressA.toString())
    const addressBType = this.detectBlockchainAddressType(addressB.toString())

    // Ensure both addresses are valid Ethereum addresses
    if (addressAType === AddressType.Unknown || addressBType === AddressType.Unknown) return false
    if (addressAType !== AddressType.Ethereum || addressBType !== addressAType) return false

    return Number(addressA) > Number(addressB)
  }

  /**
   * Checks if the first Ethereum address is less than or equal to the second Ethereum address.
   * Combines equality and less-than checks.
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