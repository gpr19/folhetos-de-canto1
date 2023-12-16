import { css, styled } from 'styled-components'

import { ButtonNone } from '../ButtonNone'

export const Container = styled.div`
  ${({ x, y }) => css`
    /* background-color: rgba(0, 0, 0, 0.5); */
    /* width: 50px;
  height: 100px; */
    top: ${y + 10}px;
    left: ${x + 10}px;
    position: fixed;
    z-index: 9;
  `}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
`

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`

export const Tom = styled.div`
  cursor: pointer;
  margin: 0 5px;
  padding: 0 3px;
  border: 1px solid #ccc;
  border-radius: ${(props) => props.theme.border.radius};
`

export const Close = styled(ButtonNone)``
