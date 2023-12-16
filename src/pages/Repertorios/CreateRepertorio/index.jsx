import { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'

import { DragDropMusics, ToastMessage } from '../../../components'
import { AuthContext } from '../../../contexts'
import { missaService, musicaService, repertorioService } from '../../../services'
import * as S from '../styles'
import { DATA_DEFAULT } from './data'

const SelectDate = () => {
  const navigate = useNavigate()

  return (
    <S.Container>
      <S.Title>Escolha uma data para criar um novo repertório</S.Title>
      <S.Content>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateCalendar
            className="div_repodate"
            onChange={(value) =>
              navigate(`/repertorios/adicionar/${moment(value?._d).format('Y-MM-DD')}`)
            }
          />
        </LocalizationProvider>
      </S.Content>
    </S.Container>
  )
}

const CreateTemplate = ({ repoId, isEdit = false }) => {
  const { user } = useContext(AuthContext)
  const { data } = useQuery('musicas', loadAllMusics)
  const navigate = useNavigate()

  const [itemList, setItemList] = useState(DATA_DEFAULT())
  const [isLoading, setLoading] = useState(false)
  const [isExists, setIsExists] = useState(null)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)

  async function loadAllMusics() {
    const res = await musicaService.getAllMusics()
    return res.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const DATA = {
      name: e.target.formRepoName.value,
      date: repoId,
      musics: JSON.stringify(itemList),
      username: user?.username,
      id: repoId,
    }

    try {
      let res = ''
      if (isEdit) {
        res = await repertorioService.editOne(DATA)
      } else {
        res = await repertorioService.createOne(DATA)
      }

      if (!res.data.error) {
        setTimeout(() => {
          navigate('/repertorios')
        }, 1500)
      }

      setMessage(res.data.message)
      setShow(true)
      setLoading(false)
    } catch (e) {
      setMessage(e.message)
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    ;(async (id, username) => {
      try {
        let repoDate = id

        if (isEdit) {
          var repo = await repertorioService.getOne(repoDate, username)
          if (!repo.data.error) {
            document.getElementById('formRepoName').value = repo.data.missa
            setItemList(JSON.parse(repo.data.musicas))
          } else {
            document.getElementById('formRepoName').value = repo.data.missa
          }
          return
        }

        var repoExist = await repertorioService.getOne(repoDate, username)
        if (!repoExist.data.error) {
          setIsExists(repoExist.data)
        }

        var res = await missaService.getMissaByDate(repoDate)
        if (!res.data.error) {
          document.getElementById('formRepoName').value = res.data.missa
          setItemList(JSON.parse(res.data.musicas))
        } else {
          document.getElementById('formRepoName').value = ''
        }
      } catch (error) {
        console.log('error', error)
        setMessage(error.message)
      }
    })(repoId, user?.username)
  }, [repoId, user, isEdit])

  return (
    <S.Container>
      {isExists && (
        <div className="center">
          <Link to={'/repertorios/' + isExists?._id + '/editar'} className="link_red">
            Já existe um repertório criado para este dia, deseja acessa-lo?
          </Link>
        </div>
      )}
      <S.ContentCreate>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRepoName">
            <Form.Label>
              <b>Nome do Repertório</b>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Exemplo: 1º Domingo do Tempo Comum - Ano A"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRepoMusics">
            <DragDropMusics
              itemList={itemList}
              setItemList={setItemList}
              dataMusics={data}
              changeTom
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando....' : isEdit ? 'Editar Repertório' : 'Adicionar Repertório'}
          </Button>
        </Form>
      </S.ContentCreate>
      <ToastMessage show={show} setShow={setShow} message={message} />
    </S.Container>
  )
}

export const CreateRepertorio = () => {
  const params = useParams()
  const repertorioDate = params['*']

  if (!repertorioDate) {
    if (params.repertorios) return <CreateTemplate repoId={params.repertorios} isEdit={true} />
    return <SelectDate />
  }

  return <CreateTemplate repoId={repertorioDate} />
}
