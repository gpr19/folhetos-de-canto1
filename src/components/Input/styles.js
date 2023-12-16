import { styled } from 'styled-components'

export const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
  outline: none;

  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.colors.white_200};
  color: #010101;
  transition: box-shadow 0.2s;
`

export const InputContent = styled.input`
  border: none;
  padding: 1px 16px;
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    box-shadow: 0 0 0 2px rgb(169, 172, 255, 0.5);
  }
`
