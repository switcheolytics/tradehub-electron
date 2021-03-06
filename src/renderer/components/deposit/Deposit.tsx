import React, { useMemo } from 'react'

import * as RD from '@devexperts/remote-data-ts'
import { Asset, AssetRuneNative } from '@xchainjs/xchain-util'
import { Grid } from 'antd'
import * as FP from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { useIntl } from 'react-intl'

import { PoolShareRD, PoolSharesRD } from '../../services/midgard/types'
import { getSharesByAssetAndType, combineSharesByAsset } from '../../services/midgard/utils'
import { KeystoreState } from '../../services/wallet/types'
import { hasImportedKeystore, isLocked } from '../../services/wallet/util'
import { AddWallet } from '../wallet/add'
import * as Styled from './Deposit.styles'

type TabKey = 'deposit-sym' | 'deposit-asym' | 'withdraw-sym' | 'withdraw-asym-asset'

type Tab = {
  key: TabKey
  label: string
  disabled: boolean
  content: JSX.Element
}

export type Props = {
  asset: Asset
  shares: PoolSharesRD
  ShareContent: React.ComponentType<{ asset: Asset; poolShare: PoolShareRD; smallWidth?: boolean }>
  AsymDepositContent: React.ComponentType<{ asset: Asset }>
  SymDepositContent: React.ComponentType<{ asset: Asset }>
  WidthdrawContent: React.ComponentType<{ asset: Asset; poolShare: PoolShareRD }>
  AsymWidthdrawContent: React.ComponentType<{ asset: Asset; poolShare: PoolShareRD }>
  keystoreState: KeystoreState
}

export const Deposit: React.FC<Props> = (props) => {
  const {
    ShareContent,
    // TODO (@Veado) Temporary disabled #827
    // AsymDepositContent,
    SymDepositContent,
    WidthdrawContent,
    // TODO (@Veado) Temporary disabled #827
    // AsymWidthdrawContent,
    asset,
    keystoreState,
    shares: poolSharesRD
  } = props
  const intl = useIntl()

  const isDesktopView = Grid.useBreakpoint()?.md ?? false

  const walletIsImported = useMemo(() => hasImportedKeystore(keystoreState), [keystoreState])
  const walletIsLocked = useMemo(() => isLocked(keystoreState), [keystoreState])

  const symPoolShare = useMemo(
    () =>
      FP.pipe(
        poolSharesRD,
        RD.map((shares) => getSharesByAssetAndType({ shares, asset, type: 'sym' }))
      ),
    [asset, poolSharesRD]
  )

  // TODO (@Veado) Temporary disabled #827
  const _asymPoolShareAsset = useMemo(
    () =>
      FP.pipe(
        poolSharesRD,
        RD.map((shares) => getSharesByAssetAndType({ shares, asset, type: 'asym' }))
      ),
    [asset, poolSharesRD]
  )

  const combinedPoolShare = useMemo(
    () =>
      FP.pipe(
        poolSharesRD,
        RD.map((shares) => combineSharesByAsset(shares, asset))
      ),
    [asset, poolSharesRD]
  )

  const hasPoolShare = (poolShare: PoolShareRD): boolean => FP.pipe(poolShare, RD.toOption, O.flatten, O.isSome)
  const hasSymPoolShare: boolean = useMemo(() => hasPoolShare(symPoolShare), [symPoolShare])
  // TODO (@Veado) Temporary disabled #827
  // const hasAsymPoolShareAsset: boolean = useMemo(() => hasPoolShare(asymPoolShareAsset), [asymPoolShareAsset])

  const tabs = useMemo(
    (): Tab[] => [
      // {
      //   key: 'deposit-asym',
      //   disabled: false,
      //   label: intl.formatMessage({ id: 'deposit.add.asym' }, { asset: asset.ticker }),
      //   content: <AsymDepositContent asset={asset} />
      // },
      {
        key: 'deposit-sym',
        disabled: false,
        label: intl.formatMessage({ id: 'deposit.add.sym' }, { asset1: asset.ticker, asset2: AssetRuneNative.ticker }),
        content: <SymDepositContent asset={asset} />
      },
      {
        key: 'withdraw-sym',
        disabled: !hasSymPoolShare,
        label: intl.formatMessage(
          { id: 'deposit.withdraw.sym' },
          { asset1: asset.ticker, asset2: AssetRuneNative.ticker }
        ),
        content: <WidthdrawContent asset={asset} poolShare={combinedPoolShare} />
      }
      // {
      //   key: 'withdraw-asym-asset',
      //   disabled: !hasAsymPoolShareAsset,
      //   label: intl.formatMessage({ id: 'deposit.withdraw.asym' }, { asset: asset.ticker }),
      //   content: <AsymWidthdrawContent asset={asset} poolShare={asymPoolShareAsset} />
      // }
    ],
    [intl, asset, SymDepositContent, hasSymPoolShare, WidthdrawContent, combinedPoolShare]
  )

  const alignTopShareContent: boolean = useMemo(
    () =>
      FP.pipe(
        symPoolShare,
        RD.toOption,
        O.flatten,
        O.fold(
          () => false,
          () => true
        )
      ),
    [symPoolShare]
  )

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        {walletIsImported && !walletIsLocked ? (
          <>
            <Styled.DepositContentCol xs={24} xl={15}>
              <Styled.Tabs destroyInactiveTabPane tabs={tabs} centered={false} defaultActiveKey="deposit-sym" />
            </Styled.DepositContentCol>
            <Styled.ShareContentCol xs={24} xl={9}>
              <Styled.ShareContentWrapper alignTop={alignTopShareContent}>
                <ShareContent smallWidth={!isDesktopView} asset={asset} poolShare={combinedPoolShare} />
              </Styled.ShareContentWrapper>
            </Styled.ShareContentCol>
          </>
        ) : (
          <AddWallet isLocked={walletIsImported && walletIsLocked} />
        )}
      </Styled.ContentContainer>
    </Styled.Container>
  )
}
