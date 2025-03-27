import { Network } from "ethers"
import { MultiCall__factory } from "../abis/types"
import { Address, ethersProvider } from "../index"
import { Call3_MultiCallStruct, MultiCallRequest, MultiCallResponse } from "../types"

export default async function multicall<T = unknown>(
  network: Network,
  requests: MultiCallRequest[],
  customContractAddress?: Address
): Promise<MultiCallResponse<T>[]> {
  const contractCalls: Call3_MultiCallStruct[] = []

  requests.forEach(request => {
    const iface = request.contractInterface.createInterface()

    const callData = request.calls.map(readableCall => ({
      target: request.target.toString(),
      allowFailure: readableCall.allowFailure ?? true,
      callData: iface.encodeFunctionData(readableCall.method, readableCall.methodParameters),
      method: readableCall.method,
      reference: readableCall.reference
    }))

    contractCalls.push(...callData)
  })

  const result = await MultiCall__factory.connect(
    customContractAddress
      ? customContractAddress.toString()
      : "0xcA11bde05977b3631167028862bE2a173976CA11",
    ethersProvider(network)
  ).aggregate3.staticCall(contractCalls)

  return result.map((rawData, i) => {
    const targetRequest = requests.find(r => Address.equal(r.target, contractCalls[i].target))

    if (!targetRequest) {
      return { success: false, data: null }
    }

    return {
      success: rawData.success,
      reference: contractCalls[i].reference,
      data: !rawData.success ? null : targetRequest.contractInterface.createInterface()
        .decodeFunctionResult(contractCalls[i].method, rawData.returnData).toArray(true) as any
    }
  })
}
