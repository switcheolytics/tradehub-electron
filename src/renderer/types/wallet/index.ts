import { Address, Balance } from '@xchainjs/xchain-client'
import { Chain } from '@xchainjs/xchain-util'

type AccountType = {
  name: string
  address: string
  type: string
}

export type UserAccountType = {
  chainName: Chain
  accounts: AccountType[]
}

export type WalletBalance = Balance & { walletAddress: Address }
export type WalletBalances = WalletBalance[]
