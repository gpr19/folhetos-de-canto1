import { styled } from 'styled-components'

export const Container = styled.div`
  margin: 5px auto;
  font-size: ${(props) => props.theme.font.sizes.xsmall};

  > * {
    display: inline-block;
    margin-right: 10px;
  }
`

export const Content = styled.div`
  color: ${(props) => props.theme.colors.gray_300};
  &:after {
    content: '>';
    margin-left: 10px;
  }
  &:last-child::after {
    display: none;
  }
`
