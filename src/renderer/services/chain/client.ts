import { BNBChain, BTCChain, Chain, ETHChain, LTCChain, THORChain } from '@xchainjs/xchain-util'
import * as O from 'fp-ts/lib/Option'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'

import * as BNC from '../binance'
import * as BTC from '../bitcoin'
import { XChainClient$ } from '../clients'
import * as ETH from '../ethereum'
import * as LTC from '../litecoin'
import { selectedPoolChain$ } from '../midgard/common'
import * as THOR from '../thorchain'
import { Chain$ } from './types'

export const clientByChain$ = (chain: Chain): XChainClient$ => {
  switch (chain) {
    case BNBChain:
      return BNC.client$
    case BTCChain:
      return BTC.client$
    case ETHChain:
      return ETH.client$
    case THORChain:
      return THOR.client$
    case LTCChain:
      return LTC.client$
    default:
      return Rx.of(O.none)
  }
}

export const getClientByChain$: (chain$: Chain$) => XChainClient$ = (chain$) =>
  chain$.pipe(
    RxOp.switchMap(
      O.fold(
        () => Rx.EMPTY,
        (chain) => clientByChain$(chain)
      )
    )
  )

/**
 * Client depending on selected pool chain
 */
export const client$ = getClientByChain$(selectedPoolChain$)
