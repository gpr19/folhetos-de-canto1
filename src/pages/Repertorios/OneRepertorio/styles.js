import { styled } from 'styled-components'

export const Container = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`
export const Content = styled.div`
  /* background-color: red; */
  max-width: 900px;
  width: 100%;
`

export const Header = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

export const ContainerSlide = styled.div`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: gray;
  /* opacity: 0.95; */
  width: 100vw;
  height: 100vh;
  z-index: 1100;
  justify-content: center;
`
export const ContentSlide = styled.div`
  /* color: white; */
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
`
export const BodySlide = styled.div``

export const HeaderSlide = styled.div`
  /* color: white; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

export const SectionTitle = styled.h1`
  margin-top: 9px;
  text-transform: uppercase;
`
