import { FallbackProvider, Network } from "ethers"
import { evmNetworksList } from "../networks"
import createFallbackProvider, { FallbackProviderCustomOptions } from "./create-fallback-provider"

interface IProviderCreateDetails {
  network: Network
  attachedNodesList: string[]
  prioritizeAttached: boolean
}

/** Map of all fallback providers created */
const fallbackProviders: { current: Map<string, IProviderCreateDetails>, customOptions?: FallbackProviderCustomOptions } = {
  current: new Map(),
  customOptions: undefined
}

/**
 * Reconfigure a stored providers list with new nodes or params
 *
 * @param {Record<string, string[]>} attachNodes list of additional nodes
 * @param {boolean} prioritizeAttached prioritize attached nodes over default public nodes
 * @param customOptions custom provider options
 */
export function reconfigureProvidersList(
  attachNodes?: Record<string, string[]>,
  prioritizeAttached: boolean = false,
  customOptions?: Omit<FallbackProviderCustomOptions, "attachNodes" | "prioritizeAttached"> & {
    /** Attach custom networks to the list of providers */
    customNetworks?: Network[]
  }
) {
  const { customNetworks, ...rest } = customOptions ?? {}

  fallbackProviders.customOptions = rest
  fallbackProviders.current = new Map(Array.from([...evmNetworksList, ...customNetworks ?? []])
    .map(network => {
      const attachedNodesList = attachNodes?.[network.name]

      return [
        network.name,
        {
          attachedNodesList: attachedNodesList ?? [],
          network,
          prioritizeAttached
        }
      ]
    }))
}

reconfigureProvidersList()

/**
 * Get a public provider of a relative network
 *
 * @param {Network} network EVM network
 */
export default function ethersProvider(network: Network): FallbackProvider | null {
  const providerCreateDetails = fallbackProviders.current.get(network.name)

  if (!providerCreateDetails) throw new Error("Unsupported network: " + network.name)

  return createFallbackProvider(network, {
    attachNodes: providerCreateDetails.attachedNodesList,
    prioritizeAttached: providerCreateDetails.prioritizeAttached,
    ...(fallbackProviders.customOptions ?? {})
  })
}
