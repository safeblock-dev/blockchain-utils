import { FallbackProvider, JsonRpcProvider, Network } from "ethers"
import publicNodesList from "./public-nodes-list"

/**
 * Create ethers FallbackProvider from public provider URLs
 *
 * Injects a private node at the top (priority = 1) if configured in the environment
 *
 * @param network network
 * @param attachNodes optional list of additional nodes
 * @param prioritizeAttached prioritize attached nodes over default public nodes, false by default
 * @param stallTimeout
 */
export default function createFallbackProvider(network: Network, attachNodes?: string[], prioritizeAttached = false, stallTimeout = 10_000) {
  // Get a list of public provider URLs
  const publicNetworkProviders = publicNodesList.get(network.name)

  if (!publicNetworkProviders) throw new Error("Unsupported network: " + network.name)

  const networkProviders = [ ...publicNetworkProviders, ...(attachNodes ?? []) ]
    .filter(providerUrl => providerUrl.length > 0)

  // Create the fallback provider
  return new FallbackProvider(networkProviders.map((providerUrl, index) => {
    const isPrioritized = attachNodes !== undefined && attachNodes.includes(providerUrl) && prioritizeAttached

    return {
      provider: new JsonRpcProvider(providerUrl, network.chainId, { staticNetwork: network }),
      priority: (index + 11) - (isPrioritized ? 10 : 0),
      stallTimeout
      //weight: attachNodes ? (attachNodes.includes(providerUrl) && prioritizeAttached ? 1 : 1) : 1
    }
  }))
}