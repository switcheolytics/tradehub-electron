import { CaretRightOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import * as A from 'antd'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Label as UILabel } from '../../../components/uielements/label'
import { Button as UIButton } from '../../uielements/button'
import { Table as UITable } from '../../uielements/table'

export const Table = styled(UITable)`
  .ant-table-tbody > tr > td {
    padding: 0px 16px;
  }

  .ant-table-tbody > tr > td > div {
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;
  }
`

export const HeaderRow = styled(A.Row)`
  font-size: 14px;
  font-family: 'MainFontRegular';
  color: ${palette('gray', 2)};
`

export const HeaderLabel = styled(UILabel).attrs({
  textTransform: 'uppercase',
  size: 'normal'
})`
  padding: 0;
`

export const HeaderAddress = styled(UILabel).attrs({
  textTransform: 'none',
  color: 'gray',
  size: 'normal'
})`
  padding: 0;
`

export const Label = styled(UILabel)`
  font-size: 16px;
`

export const Collapse = styled(A.Collapse)`
  &.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    background-color: ${palette('background', 2)};
    padding: 5px 20px;
  }

  &.ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  &.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    border-bottom: 1px solid ${palette('gray', 1)};
  }

  &.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    top: 10px;
  }
`

export const ExpandIcon = styled(CaretRightOutlined)`
  margin-top: -13px;
  svg {
    color: ${palette('primary', 0)};
  }
`

export const HideIcon = styled(EyeInvisibleOutlined)`
  svg {
    color: ${palette('gray', 2)};
  }
  /* TODO (@Veado)
    Change to pointer if hide asset feature is implemented
    see https://github.com/thorchain/asgardex-electron/issues/476
  */
  cursor: pointer;
`

export const CopyLabelContainer = styled.span``

export const CopyLabel = styled(A.Typography.Text)`
  text-transform: uppercase;
  color: ${palette('primary', 0)};
  svg {
    color: ${palette('primary', 0)};
  }
`

export const BnbRuneTickerWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const UpgradeButton = styled(UIButton).attrs({
  type: 'primary',
  round: 'true',
  color: 'warning'
})`
  &.ant-btn {
    min-width: auto;
    margin-left: 10px;
  }
`
