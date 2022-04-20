import { isDenom } from "./is"

export interface Asset {
  amount: string
  info: AssetInfo
}

type AssetInfo = AssetInfoNativeToken | AssetInfoCW20Token

export interface AssetInfoNativeToken {
  native_token: { denom: string }
}

export interface AssetInfoCW20Token {
  token: { contract_addr: string }
}

export const toAssetInfo = (token: string) => {
  return isDenom(token)
    ? { native_token: { denom: token } }
    : { token: { contract_addr: token } }
}

export const toAsset = (token: string, amount: string) => {
  return { amount, info: toAssetInfo(token) }
}

const toToken = (info: AssetInfo) => {
  return "native_token" in info
    ? info.native_token.denom
    : info.token.contract_addr
}

export const toTokenItem = ({ amount, info }: Asset) => {
  return { amount, token: toToken(info) }
}
