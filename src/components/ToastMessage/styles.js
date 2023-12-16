import { styled } from 'styled-components'

export const Container = styled.div`
  position: fixed;
  /* left: 200px; */
  bottom: 120px;
  /* transition: all 0.5s ease-in-out; */

  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(40px)')};
  transition: transform 0.5s;

  width: 100%;
  * {
    font-size: 1.6rem;
  }
`
