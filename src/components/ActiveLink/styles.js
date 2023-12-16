import { NavLink } from 'react-router-dom'

import { lighten } from 'polished'
import { styled } from 'styled-components'

export const Container = styled.div`
  transition: all 0.3s;
  background-color: ${(props) =>
    props.$iscurrent === 'true' ? props.theme.colors.blue : 'transparent'};

  &:hover {
    background-color: ${(props) => lighten(0.1, props.theme.colors.blue)};
  }
`

export const Link = styled(NavLink)`
  display: flex;
  justify-content: ${(props) => (props.isopen === 'true' ? 'flex-start' : 'center')};
  gap: 10px;
  color: ${(props) =>
    props.$iscurrent === 'true' ? props.theme.colors.white : props.theme.colors.gray_300};
  padding: 8px 12px;
`
