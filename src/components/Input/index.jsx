import * as S from './styles'

const InputRoot = ({ children }) => {
  return <S.Container>{children}</S.Container>
}

export const Input = {
  Root: InputRoot,
  InputContent: S.InputContent,
}
