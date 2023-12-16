import { Link } from 'react-router-dom'

import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
`
export const CustomLink = styled(Link)`
  &:hover {
    color: blue;
    text-decoration: underline;
  }
`
