import { Row } from 'react-bootstrap'
import { useQuery } from 'react-query'

import { CardMissa, HeaderPage, Loading } from '../../components'
import { dataAtualFormatada } from '../../functions'
import { missaService } from '../../services'
import * as S from './styles'

export const Home = () => {
  const { data, isFetching, isError } = useQuery('nextdays', loadNextDays)

  async function loadNextDays() {
    const res = await missaService.getNextDays()
    return res.data
  }

  if (isFetching) {
    return <Loading height={270} width="300px" lines={4} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  return (
    <S.Container>
      <HeaderPage title="Próximas Missas" pageTitle="Folhetos de Canto" />
      <Row xs={1} lg={3} className="g-4 d-flex justify-content-center">
        {data &&
          data.map((item, index) => (
            <CardMissa key={index} to={item.url}>
              <CardMissa.Img
                alt="imagem do dia da missa"
                src={process.env.REACT_APP_API_IMG_URL + '/' + item.imagem}
              />
              <CardMissa.Body>
                <CardMissa.Title>{item.missa}</CardMissa.Title>
                <CardMissa.Text>{dataAtualFormatada(item.data)}</CardMissa.Text>
              </CardMissa.Body>
            </CardMissa>
          ))}
      </Row>
    </S.Container>
  )
}
