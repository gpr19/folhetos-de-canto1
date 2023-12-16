import { ToggleButton as BSToggleButton } from 'react-bootstrap'

import { styled } from 'styled-components'

export const ContanerTom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`

export const ToggleButton = styled(BSToggleButton)`
  font-size: 1.6rem;
  min-width: 35px;
  width: auto;
  color: ${(props) => props.theme.colors.black};
`
