import * as S from './styles'
export const HeaderPage = ({ title = '', subTitle = '', pageTitle = 'Folhetos de Canto' }) => {
  document.title = pageTitle

  return (
    title && (
      <S.Container>
        <S.Content>
          <S.Title>{title}</S.Title>
          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.Content>
      </S.Container>
    )
  )
}
