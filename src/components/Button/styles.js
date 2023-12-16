import { styled } from 'styled-components'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.full === 'true' ? '100%' : null)};
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
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.purple_200};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.white_200};
  }
  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
    /* background: red; */
  }
`
