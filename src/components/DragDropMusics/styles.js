import { styled } from 'styled-components'

export const ContainerAdd = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
`
export const ContainerList = styled.div`
  li {
    list-style: none;
  }
`

export const Header = styled.div`
  padding: 0 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  gap: 10px;
  > button {
    display: flex;
    align-items: center;
    gap: 10px;
    color: red;
  }
`

export const ChangeTom = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`

export const Tom = styled.div`
  cursor: pointer;
  margin: 0 5px;
  padding: 0 3px;
  border: 1px solid #ccc;
  border-radius: ${(props) => props.theme.border.radius};
`

export const ListMusics = styled.div`
  cursor: default;
  > ul {
    padding-left: 5px;
    > li {
      display: flex;
      overflow: visible;
      align-items: center;
      /* background-color: red; */
      > a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* border: 1px solid #000000; */
      }
      > svg {
        margin-left: 5px;
        cursor: pointer;
        :hover {
          color: red;
        }
      }
    }
  }
`
