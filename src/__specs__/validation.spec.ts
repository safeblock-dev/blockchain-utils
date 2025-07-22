import { describe, expect, it } from "vitest"
import { Address, bnb } from "../index"

describe("Address util basic checks", () => {
  it("should correctly process address conversions", () => {
    const address = Address.from(Address.evmNativeAddress)

    expect(address).toBeInstanceOf(Address)
    expect(address.toString()).toEqual(Address.evmNativeAddress.toString())
  })

  it("should replace native addresses", () => {
    const bnbWrappedAddress = Address.wrappedOf(bnb)
    const address = Address.requireWrapped(Address.zeroAddress, bnb)
    const nativeAddress = Address.isNative(address)

    expect(address).toBeInstanceOf(Address)
    expect(bnbWrappedAddress).toBeInstanceOf(Address)

    expect(bnbWrappedAddress.toString()).toEqual(address.toString())
    expect(bnbWrappedAddress.toString()).not.toEqual(Address.zeroAddress.toString())
    expect(nativeAddress).toBeFalsy()
  })

  it("should correctly replace custom addresses", () => {
    const address = Address.replaceAddress(Address.evmBurnAddress, Address.evmBurnAddress, () => Address.zeroAddress)

    expect(address).toBeInstanceOf(Address)
    expect(address.toString()).toEqual(Address.zeroAddress.toString())
  })
})