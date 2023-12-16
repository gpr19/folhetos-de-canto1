import { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ptBR } from '@mui/x-date-pickers/locales'
import moment from 'moment'
import 'moment/locale/pt-br'

import { Button, DragDropMusics, HeaderPage, ToastMessage } from '../../../components'
import { slugify } from '../../../functions'
import { missaService, musicaService } from '../../../services'
import * as S from '../styles'
import { DATA_DEFAULT } from './data'

export const CreateMissa = () => {
  const { missa: currentMissa } = useParams()
  const navigate = useNavigate()

  const { data } = useQuery('musicas', loadAllMusics)

  const [dateValue, setDateValue] = useState(moment())
  const [changeImg, setChangeImg] = useState(currentMissa ? true : false)
  const [itemList, setItemList] = useState(DATA_DEFAULT())
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)

  async function loadAllMusics() {
    const res = await musicaService.getAllMusics()
    return res.data
  }

  const changeNameMissa = (value) => {
    document.getElementById('formMissaUrl').value = slugify(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    var name = e.target.formMissaName.value
    var url = e.target.formMissaUrl.value
    var date = moment(dateValue?._d).format('Y-MM-DD')
    var description = e.target.formMissaDesc.value
    var img = changeImg
      ? document.getElementById('label_atual').innerHTML
      : e.target.formMissaImg.files[0]
    var musics = JSON.stringify(itemList)

    const DATA = {
      name,
      url,
      date,
      image: img,
      musics,
      description,
      currentMissa,
    }

    try {
      let res = ''
      if (currentMissa) {
        res = await missaService.editMissa(DATA)
      } else {
        res = await missaService.createMissa(DATA)
      }
      setTimeout(() => {
        navigate('/missa/' + url)
      }, 1500)
      setMessage(res.data.message)
      setShow(true)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      setMessage(e.message)
    }
    setLoading(false)

    // console.log(name, url, date, img, description, musics)
  }

  useEffect(() => {
    if (!currentMissa) return
    ;(async (missa) => {
      try {
        const res = await missaService.getMissa(missa)
        if (res.data) {
          var data = res.data
          document.getElementById('formMissaName').value = data.missa
          document.getElementById('formMissaUrl').value = data.url
          document.getElementById('formMissaDesc').value = data.descricao
          document.getElementById('label_atual').innerHTML = data.imagem
          setDateValue(moment(data.data))
          if (data.musicas) {
            setItemList(JSON.parse(data.musicas))
          }
        } else {
          alert('Essa missa ainda nao existe')
          setChangeImg(false)
        }
      } catch (e) {
        console.log('error missa: ', e)
      }
    })(currentMissa)
  }, [currentMissa])

  return (
    <S.Container>
      <HeaderPage
        title={currentMissa ? 'Editar Missa' : 'Criar nova Missa'}
        pageTitle={
          currentMissa
            ? 'Editar Missa - Folhetos de Canto'
            : 'Criar nova Missa  - Folhetos de Canto'
        }
      />
      <S.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formMissaName">
            <Form.Label>
              <b>Nome da Missa</b>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Exemplo: 1º Domingo do Tempo Comum - Ano A"
              onChange={(value) => changeNameMissa(value.target.value)}
            />
          </Form.Group>

          <Form.Label htmlFor="formMissaUrl">
            <b>URL da Missa</b>
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>www..../sugestoes-para/</InputGroup.Text>
            <Form.Control
              required
              id="formMissaUrl"
              placeholder="exemplo: 1-domingo-tempo-comum-ano-a"
            />
          </InputGroup>

          <Form.Group className="mb-3 " controlId="formMissaDate">
            <Form.Label>
              <b>Data da Missa</b>
            </Form.Label>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale="pt-br"
              localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <S.DateCalendar
                className="div_missadate"
                value={dateValue}
                onChange={(value) => setDateValue(value)}
              />
            </LocalizationProvider>
          </Form.Group>

          <Form.Group controlId="formMissaImg" className="mb-3">
            <Form.Label>
              <b>Imagem</b>
            </Form.Label>
            <br />
            {changeImg ? (
              <>
                <Form.Label id="label_atual"></Form.Label>
                <Button className="ms-2" variant="outline-info" onClick={() => setChangeImg(false)}>
                  Trocar Imagem
                </Button>
              </>
            ) : (
              <Form.Control disabled={changeImg} type="file" accept="image/*" />
            )}
          </Form.Group>

          <Form.Group controlId="formMissaDesc" className="mb-4">
            <Form.Label>
              <b>Descrição</b>
            </Form.Label>
            <Form.Control as="textarea" style={{ height: '120px' }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMissaMusics">
            <DragDropMusics itemList={itemList} setItemList={setItemList} dataMusics={data} />
          </Form.Group>

          <ToastMessage show={show} setShow={setShow} message={message} />

          <Button $variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando....' : changeImg ? 'Salvar Dados' : 'Adicionar Missa'}
          </Button>
        </Form>
      </S.Content>
    </S.Container>
  )
}
