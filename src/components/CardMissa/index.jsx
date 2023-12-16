import * as S from './styles'

export const CardMissa = ({ children, to }) => {
  return <S.Container to={'missa/' + to}>{children}</S.Container>
}

CardMissa.Img = S.CardImg
CardMissa.Body = S.CardBody
CardMissa.Title = S.CardTitle
CardMissa.Text = S.CardText
