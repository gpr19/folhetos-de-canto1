import { styled } from 'styled-components'

import { ButtonNone } from '../../ButtonNone'

export const ListMusic = styled.ul`
  max-width: 97%;
  max-height: ${window.innerHeight - 350}px;
  overflow-y: scroll;
`

export const ListMusicItems = styled.li`
  font-size: 1.4rem;
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;

  > button {
    color: inherit;
    text-decoration: none;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    > svg {
      margin-right: 5px;
    }
  }
`

export const FinalMusicsList = styled.div`
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
`

export const FinaMusisItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  max-width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FinalMusicItemText = styled.span`
  margin-right: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ButtonRemove = styled(ButtonNone)`
  display: flex;
  align-items: center;
  :hover {
    color: red;
  }
`
