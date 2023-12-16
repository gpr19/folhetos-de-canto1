import { styled } from 'styled-components'

export const Container = styled.div``

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px;
  background-color: ${(props) => props.theme.colors.white};
`

export const Card = styled.div`
  width: 100%;
  max-width: 450px;
  border-radius: 5px;
  padding: 50px;
  margin-bottom: 40px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray_50};
  box-shadow: ${(props) => props.theme.box.shadow};
  h2 {
    font-weight: ${(props) => props.theme.font.bold};
    margin-bottom: 50px;
  }
`

export const InputGroup = styled.div`
  margin-bottom: 24px;
  text-align: left;
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.gray_300};
  }
`

export const ErrorLabel = styled.span`
  color: red;
`

export const Input = styled.input`
  width: 100%;
  outline: none;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.border.radius};
  border: 1px solid ${(props) => props.theme.colors.white_200};
  color: #010101;
  transition: box-shadow 0.2s;
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    box-shadow: 0 0 0 2px rgb(169, 172, 255, 0.5);
  }
`

export const Button = styled.button`
  width: ${(props) => (props.$full === 'true' ? '100%' : null)};
  min-width: 64px;
  margin-top: 10px;
  border: 0;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.purple_100};
  color: ${(props) => props.theme.colors.white_100};
  font-weight: ${(props) => props.theme.font.normal};
  font-size: ${(props) => props.theme.font.sizes.small};
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.purple_200};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.white_200};
  }
`
