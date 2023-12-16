import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1000px;
`

export const Content = styled.div`
  /* background-color: red; */
  width: 1000px;
`

export const ListParts = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
`

export const ListMusic = styled.ul`
  display: flex;
  flex-direction: column;
`
export const ListLinks = styled.div`
  display: flex;
  gap: 5px;
  align-items: baseline;
`

export const InfoTempo = styled.span`
  font-size: 14px !important;
  align-self: baseline;
  font-style: italic !important;
  color: #009999;
`

export const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  &:hover {
    color: blue;
    text-decoration: underline;
  }
  > svg {
    margin-left: 5px;
  }
`
