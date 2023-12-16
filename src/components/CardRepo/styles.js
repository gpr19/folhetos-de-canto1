import { styled } from 'styled-components'

import { ButtonNone } from '../ButtonNone'

export const Container = styled.div`
  margin: 5px !important;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  position: relative;
  float: left;
  width: 285px !important;
  height: 130px;
`

export const Header = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`

export const Title = styled.h2``

export const Date = styled.span`
  font-size: 13px;
  font-weight: 400;
  overflow: hidden;
  color: #aaa;
  padding: 0 1px;
`

export const Footer = styled.div`
  display: flex;
  gap: 195px;
  position: absolute;
  bottom: 10px;
  flex-wrap: wrap-reverse;
  align-content: center;
`

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

export const Action = styled(ButtonNone)`
  color: ${(props) => props.theme.colors.black};
`
