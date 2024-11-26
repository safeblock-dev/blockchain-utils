import { ethers } from "ethers"

type AnyAmountType = number | string | BigInt | ethers.BigNumberish | Amount

export default class Amount {
  readonly #amount = BigInt(0)
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

    this.#amount = isReadable
      ? BigInt((Number(String(amount)) * 10 ** decimalPlaces).toFixed(0))
      : BigInt(String(amount))
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
    return String(amount).toLowerCase() !== "nan"
      && Number(String(amount)) < Number.POSITIVE_INFINITY
      && Number(String(amount)) > Number.NEGATIVE_INFINITY
  }

  // Math operations

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public lt(amount: AnyAmountType): boolean {
    return this.#amount < Amount.from(amount, 18, false).toBigInt()
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public gt(amount: AnyAmountType): boolean {
    return this.#amount > Amount.from(amount, 18, false).toBigInt()
  }

  /**
   * TBA
   * @param {AnyAmountType} amount
   * @returns {boolean}
   */
  public eq(amount: AnyAmountType): boolean {
    return this.#amount === Amount.from(amount, 18, false).toBigInt()
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
    return Amount.from(
      Amount.from(amount, 18, false).toBigInt() + this.#amount,
      this.#decimalPlaces,
      false
    )
  }

  /**
   * Subtracts another amount from the current amount.
   *
   * @param amount - The value to subtract (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public sub(amount: AnyAmountType): Amount {
    return Amount.from(
      this.#amount - Amount.from(amount, 18, false).toBigInt(),
      this.#decimalPlaces,
      false
    )
  }

  /**
   * Multiplies the current amount by another amount.
   *
   * @param amount - The value to multiply by (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public mul(amount: AnyAmountType): Amount {
    return Amount.from(
      Amount.from(amount, 18, false).toBigInt() * this.#amount,
      this.#decimalPlaces,
      false
    )
  }

  /**
   * Divides the current amount by another amount.
   *
   * @param amount - The value to divide by (can be a number, string, BigInt, ethers.BigNumberish, or another `Amount`).
   * @returns A new `Amount` instance representing the result.
   */
  public div(amount: AnyAmountType): Amount {
    return Amount.from(
      this.#amount / Amount.from(amount, 18, false).toBigInt(),
      this.#decimalPlaces,
      false
    )
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
    return this.#amount.toString()
  }

  /**
   * Converts the `Amount` to a `BigInt` representation.
   *
   * @returns The `BigInt` representation of the amount.
   */
  public toBigInt(): bigint {
    return this.#amount
  }

  /**
   * Converts the `Amount` to a readable number format (e.g., with decimal places).
   *
   * @returns The readable number representation of the amount.
   */
  public toReadable(): number {
    return this.correctFloatingPointError(
      parseInt(this.#amount.toString()) * 10 ** -this.#decimalPlaces
    )
  }

  /**
   * Converts the `Amount` to an integer format (removing decimal places).
   *
   * @returns The integer representation of the amount.
   */
  public toInteger(): number {
    return parseInt(this.#amount.toString())
  }

  // Internal utils

  /**
   * Corrects floating-point errors by rounding to the desired precision.
   *
   * @param value - The floating-point number to correct.
   * @param precision - The number of decimal places to round to (default is 18).
   * @returns The corrected floating-point number.
   */
  private correctFloatingPointError(value: number, precision: number = 18): number {
    const factor = Math.pow(10, precision)
    return Math.round(value * factor) / factor
  }

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