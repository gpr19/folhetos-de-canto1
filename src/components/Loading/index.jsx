// import { Container, Spinner } from 'react-bootstrap'
import * as S from './styles'

export const Loading = ({ lines = 5, height = 20, width = '100%', spacings = 6 }) => {
  return (
    <S.Container $spacings={spacings}>
      {[...Array(lines)].map((_, index) => (
        <S.Content key={index} height={height} width={width} />
      ))}
    </S.Container>
  )
}
