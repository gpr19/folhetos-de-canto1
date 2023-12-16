import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { useQuery } from 'react-query'

import { HeaderPage, Loading } from '../../components'
import { musicaService } from '../../services'
import * as S from './styles'

const arrayType = [
  { value: 'Entrada', type: 'entrada' },
  { value: 'Perdão', type: 'perdao' },
  { value: 'Glória', type: 'gloria' },
  { value: 'Aclamação', type: 'aclamacao' },
  { value: 'Salmo', type: 'salmo' },
  { value: 'Ofertório', type: 'ofertorio' },
  { value: 'Santo', type: 'santo' },
  { value: 'Amém', type: 'amem' },
  { value: 'Cordeiro', type: 'cordeiro' },
  { value: 'Comunhão', type: 'comunhao' },
  { value: 'Pós-comunhão', type: 'pos-comunhao' },
  { value: 'Final', type: 'final' },
  { value: 'Louvação', type: 'louvacao' },
]

export const PartesDaMissa = () => {
  const { data, isFetching, isError } = useQuery('musicas', loadAllMusics)

  async function loadAllMusics() {
    const res = await musicaService.getAllMusics()
    return res.data
  }

  if (isFetching) {
    return <Loading lines={10} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  const filterByTypeMusic = (musicType) => {
    return data?.filter((type) => type.categoria === musicType)
  }

  return (
    <S.Container>
      <HeaderPage title="Partes da Missa" pageTitle="Partes da Missa - Folhetos de Canto" />

      <S.Content>
        <Tab.Container id="left-tabs-example" defaultActiveKey="entrada">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="nav-musics flex-column">
                {arrayType.map((item) => (
                  <Nav.Item key={item.type}>
                    <Nav.Link eventKey={item.type}>{item.value}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                {arrayType.map((item) => (
                  <Tab.Pane eventKey={item.type} key={item.type}>
                    <TypeMusic musics={filterByTypeMusic(item.type)} />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </S.Content>
    </S.Container>
  )
}

const TypeMusic = ({ musics }) => {
  const showComma = (length) => {
    const check = length - 1
    if (check > 0) {
      return ', '
    }
  }
  return (
    <S.ListMusic>
      {musics?.map((item, key) => (
        <S.ListLinks key={key}>
          <S.CustomLink to={'/musicas/' + item.url} target="_blank">
            {'> ' + item.nome.toUpperCase()} <FaExternalLinkAlt size={12} />
          </S.CustomLink>
          {JSON.parse(item.subcategoria).length !== 0 && (
            <S.InfoTempo>
              {'Tempo: '}
              {JSON.parse(item.subcategoria).map((subitem) => (
                <>
                  {subitem.value}
                  {showComma(JSON.parse(item.subcategoria).length)}
                </>
              ))}
            </S.InfoTempo>
          )}
        </S.ListLinks>
      ))}
    </S.ListMusic>
  )
}
