import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 20px;
`

export const Content = styled.div`
  width: 100%;
  /* background-color: red; */
`

export const Title = styled.h1`
  font-weight: ${(props) => props.theme.font.bold};
`
export const SubTitle = styled.h3`
  font-weight: ${(props) => props.theme.font.bold};
`
