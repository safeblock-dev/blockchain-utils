import { FallbackProvider, Network } from "ethers"
import { evmNetworksList } from "../networks"
import createFallbackProvider from "./create-fallback-provider"

/** Map of all fallback providers created */
const fallbackProviders: { current: Map<string, FallbackProvider> } = {
  current: new Map()
}

/**
 * Reconfigure stored providers list with new nodes or params
 *
 * @param {Record<string, string[]>} attachNodes list of additional nodes
 * @param {boolean} prioritizeAttached prioritize attached nodes over default public nodes
 */
export function reconfigureProvidersList(attachNodes?: Record<string, string[]>, prioritizeAttached: boolean = false) {
  fallbackProviders.current = new Map(Array.from(evmNetworksList).map(network => {
    const attachedNodesList = attachNodes?.[network.name]

    return [
      network.name,
      createFallbackProvider(network, attachedNodesList, prioritizeAttached)
    ]
  }))
}

reconfigureProvidersList()

/**
 * Get a public provider of relative network
 *
 * @param {Network} network EVM network
 */
export default function ethersProvider(network: Network): FallbackProvider | null {
  const provider = fallbackProviders.current.get(network.name)

  if (!provider) throw new Error("Unsupported network: " + network.name)

  return provider
}