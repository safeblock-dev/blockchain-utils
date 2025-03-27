import { ethers } from "ethers"
import Address from "./address"

export interface MultiCallRequest {
  target: Address
  contractInterface: { createInterface: () => ethers.Interface }
  calls: Array<{
    reference?: string
    method: string
    methodParameters: unknown[]
    allowFailure?: boolean
  }>
}

export interface Call3_MultiCallStruct {
  target: string
  allowFailure: boolean
  callData: string
  method: string
  reference?: string
}

export interface MultiCallResponse<T> {
  success: boolean
  data: T | null
  reference?: string
}
