import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { LuMusic2 } from 'react-icons/lu'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loading, ModalConfirm } from '../../components'
import { AuthContext } from '../../contexts'
import { dataAtualFormatada } from '../../functions'
import { missaService } from '../../services'
import * as S from './styles'

export const Missa = () => {
  const { missa: currentMissa } = useParams()
  const navigate = useNavigate()

  const { data, isFetching, isError } = useQuery('nextdays', loadNextDays)
  const { user } = useContext(AuthContext)

  const [show, setShow] = useState(false)

  async function loadNextDays() {
    const res = await missaService.getMissa(currentMissa)
    return res.data
  }

  async function handleDelete() {
    const res = await missaService.deleteMissa(currentMissa)

    if (!res.data.error) {
      navigate('/')
    } else {
      alert(res.data.message)
    }
  }

  if (isFetching) {
    return <Loading height={30} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  return (
    <S.Container>
      {data && (
        <S.Content>
          <S.MissaHeader>
            {user && user.level === 'admin' && (
              <S.ContainerAdd>
                <Button
                  as={Link}
                  to={'/missa/' + currentMissa + '/editar'}
                  variant="outline-success"
                >
                  Editar Missa
                </Button>
                <Button variant="outline-danger" onClick={() => setShow(true)}>
                  Excluir Missa
                </Button>
              </S.ContainerAdd>
            )}
            <S.MissaHeader.Title>{data.missa}</S.MissaHeader.Title>
            <S.MissaHeader.SubTitle>{dataAtualFormatada(data.data)}</S.MissaHeader.SubTitle>
            {data.imagem && (
              <S.MissaHeader.Img src={process.env.REACT_APP_API_IMG_URL + '/' + data.imagem} />
            )}
          </S.MissaHeader>
          <S.ContentMusics>
            <S.Accordion alwaysOpen>
              {data?.musicas.length > 0 &&
                JSON.parse(data.musicas).map((item, key) => {
                  return (
                    <S.Accordion.Item eventKey={key} key={key}>
                      <S.Accordion.Header>
                        <LuMusic2 />
                        {item.title}
                      </S.Accordion.Header>
                      <S.Accordion.Body>
                        {item.musics?.map((subitem, index) => {
                          return (
                            <S.Accordion.Link
                              key={index}
                              target="_blank"
                              rel="noreferrer"
                              to={'/musicas/' + subitem.url_music}
                            >
                              <BsFillArrowRightCircleFill /> <span>{subitem.name_music}</span>
                            </S.Accordion.Link>
                          )
                        })}
                      </S.Accordion.Body>
                    </S.Accordion.Item>
                  )
                })}
            </S.Accordion>
          </S.ContentMusics>
        </S.Content>
      )}
      <ModalConfirm show={show} setShow={setShow} handleConfirm={handleDelete} />
    </S.Container>
  )
}
