import BigNumber from "bignumber.js"
import { ethers } from "ethers"

type AnyAmountType = number | string | BigInt | ethers.BigNumberish | Amount | BigNumber

export default class Amount {
  private readonly amount = new BigNumber(0)
  readonly #decimalPlaces: number = 0

  /**
   * Creates a new `Amount` instance.
   *
   * @param amount - The initial value of the amount (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @param decimalPlaces - The number of decimal places for this amount.
   * @param readable - Optional flag indicating whether the amount is in a readable format (e.g., with decimal places).
   */
  constructor(amount: AnyAmountType, decimalPlaces: number, readable?: boolean) {
    const isReadable = this.isReadable(amount, readable)

    const _readable = amount instanceof Amount ? amount.toReadable() : amount

    this.amount = isReadable
      ? new BigNumber(String(_readable)).shiftedBy(decimalPlaces).dp(0)
      : new BigNumber(String(_readable)).dp(0)
    this.#decimalPlaces = decimalPlaces
  }

  public static from(amount: Amount): Amount
  public static from(amount: AnyAmountType, decimalPlaces: number, readable?: boolean): Amount

  /**
   * Creates a new `Amount` instance from an existing `Amount` object or a raw value.
   *
   * @param amount - The value to convert into an `Amount` (can be a number, string, BigInt, or another `Amount`).
   * @param decimalPlaces - The number of decimal places for the new `Amount` (required if the input is not an `Amount` instance).
   * @param readable - Optional flag indicating whether the input value is in a readable format.
   * @returns A new `Amount` instance.
   * @throws An error if `decimalPlaces` is not provided when needed.
   */
  public static from(amount: AnyAmountType | Amount, decimalPlaces?: number, readable?: boolean): Amount {
    if (amount instanceof Amount) return amount

    if (!decimalPlaces) throw new Error("Decimal places not provided")

    return new Amount(amount, decimalPlaces, readable)
  }

  /**
   * Select one of specified amounts
   *
   * @param {Amount} amounts list of amounts
   * @returns {Amount} resulting amount or undefined
   */
  public static select(...amounts: (Amount | null | undefined)[]): Amount | undefined {
    for (const amount of amounts) {
      if (!amount || !Amount.isAmount(amount)) continue

      return amount
    }
  }

  /**
   * Check if specified value is amount
   *
   * @param {AnyAmountType} amount value
   * @returns {boolean} true when amount
   */
  public static isAmount(amount: AnyAmountType): boolean {
    const _a = BigNumber.isBigNumber(amount) ? amount : new BigNumber(String(amount))

    return _a.toString().toLowerCase() !== "nan"
      && _a.lt(Number.POSITIVE_INFINITY)
      && _a.gt(Number.NEGATIVE_INFINITY)
  }

  // Math operations

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public lt(amount: AnyAmountType): boolean {
    return this.toReadableBigNumber().lt(Amount.parse(amount))
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public gt(amount: AnyAmountType): boolean {
    return this.toReadableBigNumber().gt(Amount.parse(amount))
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public eq(amount: AnyAmountType): boolean {
    //return this.amount === Amount.from(amount, 18, false).toBigInt()
    return this.toReadableBigNumber().eq(Amount.parse(amount))
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public lte(amount: AnyAmountType): boolean {
    return this.lt(amount) || this.eq(amount)
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public gte(amount: AnyAmountType): boolean {
    return this.gt(amount) || this.eq(amount)
  }

  /**
   * Adds another amount to the current amount.
   *
   * @param amount - The value to add (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public add(amount: AnyAmountType): Amount {
    const bn = Amount.parse(amount).plus(this.toReadableBigNumber())

    return new Amount(bn, this.#decimalPlaces, true)
  }

  /**
   * Subtracts another amount from the current amount.
   *
   * @param amount - The value to subtract (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public sub(amount: AnyAmountType): Amount {
    const bn = this.toReadableBigNumber().minus(Amount.parse(amount))

    return new Amount(bn, this.#decimalPlaces, true)
  }

  /**
   * Multiplies the current amount by another amount.
   *
   * @param amount - The value to multiply by (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public mul(amount: AnyAmountType): Amount {
    const bn = this.toReadableBigNumber().multipliedBy(Amount.parse(amount))

    return new Amount(bn, this.#decimalPlaces, true)
  }

  /**
   * Divides the current amount by another amount.
   *
   * @param amount - The value to divide by (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public div(amount: AnyAmountType): Amount {
    const bn = this.toReadableBigNumber().div(Amount.parse(amount))

    return new Amount(bn, this.#decimalPlaces, true)
  }

  // Getters

  /**
   * Gets the number of decimal places for this `Amount`.
   *
   * @returns The number of decimal places.
   */
  public get decimalPlaces(): number {
    return this.#decimalPlaces
  }

  // Converters

  /**
   * Converts the `Amount` to a string representation.
   *
   * @returns The string representation of the amount.
   */
  public toString(): string {
    return this.amount.toFixed()
  }

  /**
   * Converts the `Amount` to a `BigInt` representation.
   *
   * @returns The `BigInt` representation of the amount.
   */
  public toBigInt(): bigint {
    return BigInt(this.amount.toFixed(0))
  }

  /**
   * Converts the `Amount` to a readable BigNumber format (e.g., with decimal places).
   *
   * @returns {BigNumber}
   */
  public toReadableBigNumber(): BigNumber {
    return this.amount.shiftedBy(-this.#decimalPlaces)
  }

  /**
   * Converts the `Amount` to a BigNumber format (e.g., without decimal places).
   *
   * @returns {BigNumber}
   */
  public toBigNumber(): BigNumber {
    return this.amount
  }

  /**
   * Converts the `Amount` to a readable number format (e.g., with decimal places).
   *
   * @returns The readable number representation of the amount.
   */
  public toReadable(): string {
    return this.toReadableBigNumber().toFixed()
  }

  /**
   * Converts the `Amount` to an integer format (removing decimal places).
   *
   * @returns The integer representation of the amount.
   */
  public toInteger(): number {
    return parseInt(this.amount.toString())
  }

  /**
   * Converts the `Amount` to an BigNumber format
   *
   * @param {AnyAmountType} value
   * @returns {BigNumber}
   */
  private static parse(value: AnyAmountType): BigNumber {
    if (value instanceof Amount) return value.toReadableBigNumber()

    return BigNumber.isBigNumber(value) ? value : new BigNumber(String(value))
  }

  // Internal utils

  /**
   * Determines whether the given amount is in a readable format.
   *
   * @param amount - The value to check.
   * @param readable - Optional flag explicitly indicating if the amount is readable.
   * @returns `true` if the amount is readable, otherwise `false`.
   */
  private isReadable(amount: AnyAmountType, readable?: boolean): boolean {
    const num = Number(String(amount))

    return typeof readable === "boolean"
      ? readable
      : typeof amount !== "bigint" || Number(num.toFixed(0)) !== num
  }
}