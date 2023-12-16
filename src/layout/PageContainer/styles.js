import { styled } from 'styled-components'

import { breakpoint } from '../../themes'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint}) {
    flex-direction: row;
  }
`

export const Main = styled.main`
  flex: 1;
  background: ${(props) => props.theme.colors.white_100};
`

export const MainContent = styled.div`
  padding: 32px 12px;
  background: ${(props) => props.theme.colors.white};
  min-height: calc(100vh - 0.75rem);
  box-shadow: ${(props) => props.theme.box.shadow};
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 0.75rem;
    margin-left: 5px;
    padding: 32px;
    border-top-left-radius: 40px;
  }
`
