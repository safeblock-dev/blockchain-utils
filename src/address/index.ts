import AddressActions from "./address-actions"
import AddressTypeChecks from "./address-type-checks"
import { AddressLike, AddressType } from "./special-addresses"

/**
 * Represents a blockchain address and provides utility methods for type checks, comparisons, and conversions.
 * Extends `AddressActions` to inherit advanced functionality for handling blockchain addresses.
 */
export default class Address extends AddressActions {
  /**
   * The internally stored address value.
   * @private
   */
  readonly #address: string

  /**
   * Creates a new `Address` instance after validating the address type.
   * Throws an error if the address type is unknown.
   *
   * @param address - The input address to initialize the instance with.
   * @throws {Error} If the address type is unknown.
   */
  constructor(address: AddressLike) {
    super()

    // Detect the address type and validate
    const addressType = AddressTypeChecks.detectBlockchainAddressType(address.toString())

    if (addressType === AddressType.Unknown) {
      throw new Error("Unknown address type")
    }

    // Store the address as a string
    this.#address = address.toString()
  }

  /**
   * Creates a new `Address` instance from any `AddressLike` input.
   * This is a convenience factory method.
   *
   * @param addressLike - The input address to convert into an `Address` instance.
   * @returns A new `Address` instance.
   */
  public static from(addressLike: AddressLike): Address {
    return new Address(addressLike)
  }

  // Comparisons

  /**
   * Compares the current address with another address for equality.
   *
   * @param address - The address to compare with.
   * @returns `true` if the addresses are equal, otherwise `false`.
   */
  public equalTo(address: AddressLike): boolean {
    return AddressTypeChecks.equal(address, this.#address)
  }

  // Conversions

  /**
   * Converts the current `Address` instance into a string representation.
   *
   * @returns The string representation of the address.
   */
  public toString(): string {
    return this.#address
  }

  // Type checks

  /**
   * Checks if the current address is a TON (The Open Network) address.
   *
   * @returns `true` if the address is a TON address, otherwise `false`.
   */
  public isTon(): boolean {
    return AddressTypeChecks.isTon(this.#address)
  }

  /**
   * Checks if the current address is a TRON address.
   *
   * @returns `true` if the address is a TRON address, otherwise `false`.
   */
  public isTron(): boolean {
    return AddressTypeChecks.isTron(this.#address)
  }

  /**
   * Checks if the current address is an Ethereum (or EVM-compatible) address.
   *
   * @returns `true` if the address is an Ethereum address, otherwise `false`.
   */
  public isEthereum(): boolean {
    return AddressTypeChecks.isEthereum(this.#address)
  }
}
