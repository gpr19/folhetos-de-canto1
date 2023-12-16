import styled, { css } from 'styled-components'

import { ButtonNone } from '../../components'
import { breakpoint } from '../../themes'

const containerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint}) {
    width: 7.1875rem;
    height: 100vh;
  }
`

export const Container = styled.div`
  ${containerStyles}

  background: ${(props) => props.theme.colors.white_100};

  @media (min-width: ${breakpoint}) {
    ${(props) =>
      props.$isopen === 'true' &&
      css`
        width: 17.5rem;
        ${Content} {
          width: 17.5rem;
        }
        ${Header} {
          width: 17.5rem;
        }
        ${Collapse} {
          left: 65px;
        }
      `};
  }
`

export const Content = styled.div`
  ${containerStyles};
  position: relative;
  background: ${(props) => props.theme.colors.white_100};
  color: #fff;
  /* height: 100vh; */
  transition: all 0.1s;
`

export const Header = styled.header`
  color: ${(props) => props.theme.colors.black};
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 1rem;
  background: ${(props) => props.theme.colors.white_100};
  position: fixed;
  width: 100%;
  z-index: 1055;

  @media (min-width: ${breakpoint}) {
    height: unset;
    padding: 2rem 1rem 1.5rem;
    justify-content: center;
    width: 7.1875rem;
    /* position: relative; */
  }
`

export const MenuProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 2s;
`

export const ProfileTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  background: ${(props) => props.theme.colors.white_200};
  border-radius: ${(props) => props.theme.border.profile};
  color: ${(props) => props.theme.colors.black};
`

export const ProfileName = styled.div`
  /* display: none; */
  color: ${(props) => props.theme.colors.black};
  margin-left: 5px;
  max-width: 13ch;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  display: none;

  @media (min-width: ${breakpoint}) {
    display: flex;
  }
`
MenuProfile.Title = ProfileTitle
MenuProfile.Name = ProfileName

export const Collapse = styled.div`
  background: ${(props) => props.theme.colors.white_100};
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  > svg {
    cursor: pointer;
  }

  @media (min-width: ${breakpoint}) {
    display: flex;
    position: fixed;
    top: 70px;
    left: 5px;
  }
`

export const MenuButton = styled(ButtonNone)`
  @media (min-width: ${breakpoint}) {
    display: none;
  }

  > svg {
    color: ${(props) => props.theme.colors.black};
  }
`

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0009;
  z-index: 999;

  opacity: ${(props) => (props.$ismobilemenuopen === 'true' ? '90%' : '0%')};
  transform: translateX(${(props) => (props.$ismobilemenuopen === 'true' ? '0' : '100%')});
  transition: opacity 300ms,
    transform 0s ${(props) => (props.$ismobilemenuopen === 'true' ? '0s' : '300ms')};

  @media (min-width: ${breakpoint}) {
    display: none;
  }
`

export const Nav = styled.nav`
  position: fixed;
  top: 5rem;
  bottom: 0;
  width: ${(props) => (props.$isopen === 'true' ? '17.5' : '7.1875')}rem;
  justify-content: space-between;
  /* padding: 0.25rem 0.5rem 1.5rem; */
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 1055;
  background-color: ${(props) => props.theme.colors.white_100};

  transform: ${(props) =>
    props.$ismobilemenuopen === 'true' ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.5s;

  @media (min-width: ${breakpoint}) {
    /* position: relative; */
    top: 11rem;
    /* width: 100%; */
    /* padding: 0px 1rem 2rem; */
    transform: none;
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 10px 0px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.font.sizes.xxsmall};
`

export const Label = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${(props) => props.theme.colors.black};
`

export const LinkLabel = styled.label`
  visibility: ${(props) => (props.$isopen === 'true' ? 'visible' : 'hidden')};
`

export const Toggle = styled.div`
  position: relative; /* <-- Add relative positioning */
  width: 50px;
  height: 28px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 23px;
    height: 23px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`

export const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Toggle} {
    background: green;

    &:before {
      transform: translate(19px, -50%);
    }
  }
`

export const CollapseButton = styled.button`
  width: 30px;
  border: 2px solid #ccc;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.white_200};
  transition: ease-in-out 0.3s;
  color: ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    border: 2px solid ${(props) => props.theme.colors.blue};
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.blue};
  }
`

export const ButtonLogout = styled(ButtonNone)``
