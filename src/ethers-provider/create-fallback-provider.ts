import { FallbackProvider, JsonRpcProvider, Network } from "ethers"
import publicNodesList from "./public-nodes-list"

export interface FallbackProviderCustomOptions {
  /** List of custom nodes to use */
  attachNodes?: string[]

  /** Prioritize custom nodes over default public nodes */
  prioritizeAttached?: boolean

  /** FallbackProvider stallTimeout option */
  stallTimeout?: number

  /** FallbackProvider stallTimeout option */
  quorum?: number

  /** Set node weight based on priority (1 for default nodes and 2 for prioritized) */
  priorityBasedWeight?: boolean

  attachedNodesOnly?: boolean
}

/**
 * Create ethers FallbackProvider from public provider URLs
 *
 * Injects a private node at the top (priority = 1) if configured in the environment
 *
 * @param network provider network
 * @param options provider options
 */
export default function createFallbackProvider(network: Network, options: FallbackProviderCustomOptions) {
  // Get a list of public provider URLs
  const publicNetworkProviders = publicNodesList.get(network.name)

  if (!publicNetworkProviders) throw new Error("Unsupported network: " + network.name)

  let networkProviders = [...publicNetworkProviders, ...(options.attachNodes ?? [])]
    .filter(providerUrl => providerUrl.length > 0)

  if (options.attachNodes && options.attachNodes.length > 0 && options.attachedNodesOnly)
    networkProviders = options.attachNodes

  if (options.attachedNodesOnly && !options.attachNodes?.length) throw new Error("Invalid configuration for attached nodes")

  // Create the fallback provider
  return new FallbackProvider(networkProviders.map((providerUrl, index) => {
    const isPrioritized = options.attachNodes !== undefined
      && options.attachNodes.includes(providerUrl)
      && options.prioritizeAttached === true

    const minWeight = Math.min(options.quorum ?? 1, 1)
    return {
      provider: new JsonRpcProvider(providerUrl, network.chainId, { staticNetwork: network }),
      priority: (index + 11) - (isPrioritized ? 10 : 0),
      stallTimeout: options.stallTimeout,
      weight: options.attachNodes
        ? (options.attachNodes.includes(providerUrl) && options.prioritizeAttached ? Math.min(options.quorum ?? 2, 2) : minWeight)
        : minWeight
    }
  }), network, { quorum: options.quorum ?? 1 })
}