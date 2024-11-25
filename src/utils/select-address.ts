import { Network } from "ethers"
import Address from "../address"

const selectAddress = <T = any>(network: Network, list: { [key: string]: T } & { default: T }): T => {
  const value = list[network.name] ?? list.default
  if (typeof value !== "string") return value

  if (Address.isAddress(value)) return Address.from(value).toString() as T

  return value
}

export default selectAddress
