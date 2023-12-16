import { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Nav, Row, Tab } from 'react-bootstrap'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa'

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

export default function ModalAddMusic(props) {
  // console.log(props.data)
  const musicList = props.data

  const [filteredMusics, setFilteredMusics] = useState(musicList)
  const [selMusics, setSelMusics] = useState([])

  const filterBySearch = (event) => {
    const query = event.target.value
    var updatedList = [...musicList]
    // updatedList = updatedList.filter((item) => {
    //   return item.nome.toString().toLowerCase().indexOf(query.toString().toLowerCase()) !== -1
    // })
    updatedList = updatedList.filter((item) => {
      return (
        item.nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            query
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ) !== false
      )
    })
    setFilteredMusics(updatedList)
  }

  const handleAddMusic = (event) => {
    const name = event.target.getAttribute('data-name')
    const url = event.target.getAttribute('data-url')
    const letra = event.target.getAttribute('data-letra')
    const cifra = event.target.getAttribute('data-cifra')
    const tom = event.target.getAttribute('data-tom')
    const checkIfIsOn = selMusics.some((element) => element.name_music === name)

    if (!checkIfIsOn) {
      setSelMusics((oldArray) => [
        ...oldArray,
        {
          name_music: name,
          url_music: url,
          letra_music: letra,
          cifra_music: cifra,
          cifra_tom: tom,
          original_tom: tom,
        },
      ])
    }
  }

  const handleDelMusic = (index) => {
    const newList = selMusics

    newList.splice(index, 1)

    const array = []
    newList.map((item) => array.push(item))

    setSelMusics(array)
  }

  const handleClose = () => {
    props.set(false)
    setSelMusics([])
  }

  const handleConfirm = () => {
    const index = props.item
    const array = props.itemList[index]

    selMusics.map((item) => array.musics.push(item))
    handleClose()
  }

  const TypeMusic = ({ musics }) => {
    return (
      <S.ListMusic>
        {musics?.map((item, key) => (
          <S.ListMusicItems key={key}>
            <Button
              variant="link"
              size="sm"
              data-url={item.url}
              data-name={item.nome}
              data-letra={item.letra}
              data-cifra={item.cifra}
              data-tom={item.tom}
              onClick={(event) => handleAddMusic(event)}
              title="Adicionar música na lista"
            >
              <BsFillArrowRightCircleFill />
              {item.nome.toUpperCase()}
            </Button>
            <a
              target="_blank"
              rel="noreferrer"
              href={'/musicas/' + item.url}
              title="Abrir em uma nova aba"
            >
              <FaExternalLinkAlt />
            </a>
          </S.ListMusicItems>
        ))}
      </S.ListMusic>
    )
  }

  const filterByTypeMusic = (musicType) => {
    return musicList?.filter((type) => type.categoria === musicType)
  }

  useEffect(() => {
    if (props.show) {
      setFilteredMusics(musicList)
    }
  }, [musicList, props.show])

  return (
    <Modal show={props.show} onHide={handleClose} backdrop="static" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Selecionar Música</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-musics" defaultActiveKey="todas">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="nav-musics flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="todas">Todas/Pesquisa</Nav.Link>
                </Nav.Item>

                {arrayType.map((item) => (
                  <Nav.Item key={item.type}>
                    <Nav.Link eventKey={item.type}>{item.value}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="todas">
                  <Form className="d-flex m-2">
                    <Form.Control
                      type="search"
                      placeholder="Procurar..."
                      className="me-2"
                      aria-label="Search"
                      onChange={filterBySearch}
                    />
                  </Form>
                  <TypeMusic musics={filteredMusics} />
                </Tab.Pane>
                {arrayType.map((item) => (
                  <Tab.Pane eventKey={item.type} key={item.type}>
                    <TypeMusic musics={filterByTypeMusic(item.type)} />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        <S.FinalMusicsList>
          {selMusics?.map((item, key) => (
            <S.FinaMusisItem key={key}>
              <S.FinalMusicItemText>{item.name_music.substring(0, 30).trim()}</S.FinalMusicItemText>
              <S.ButtonRemove onClick={() => handleDelMusic(key)}>
                <FaTrash />
              </S.ButtonRemove>
            </S.FinaMusisItem>
          ))}
        </S.FinalMusicsList>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
