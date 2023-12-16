import { Table as BPTable } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  /* background-color: red; */
`

export const ContainerCreate = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
`

export const ContentCreate = styled.div`
  width: 100%;
  max-width: 550px;
  border-radius: 5px;
  padding: 50px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray_50};
  box-shadow: ${(props) => props.theme.box.shadow};
  .mb-3 {
    text-align: left;
  }
  label {
    display: inline-block;
  }
`

export const Grid = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`

export const Message = styled.div`
  color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ListUser = styled.ul`
  list-style-type: none;
`

export const Users = styled.li``

export const LinkUser = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`

export const Table = styled(BPTable).attrs((props) => {
  const variant = props.theme.colors.white === '#ffffff' ? 'light' : 'dark'
  return {
    variant: variant,
  }
})`
  margin-top: 10px;
  background: black;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  > button > svg {
    color: ${(props) => props.theme.colors.black};
  }
`
// export const Users = styled.ul``
