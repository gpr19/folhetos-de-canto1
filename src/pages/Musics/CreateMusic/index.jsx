import { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'

import { Button, EditChord, EditLyrics, HeaderPage, ToastMessage } from '../../../components'
import { convertHtmlToDraft, slugify } from '../../../functions'
import { musicaService } from '../../../services'
import * as S from '../styles'

const options = [
  { value: 'comum', label: 'Tempo Comum' },
  { value: 'advento', label: 'Tempo do Advento' },
  { value: 'natal', label: 'Tempo do Natal' },
  { value: 'quaresma', label: 'Tempo da Quaresma' },
  { value: 'pascal', label: 'Tempo Pascal' },
]

export const CreateMusic = () => {
  const { music: currentMusic } = useParams()
  const navigate = useNavigate()

  const [lyrics, setLyrics] = useState()
  const [chord, setChord] = useState()
  const [tom, setTom] = useState()
  const [isLoading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(false)

  const changeNameMusic = (value) => {
    document.getElementById('formMusicUrl').value = slugify(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    var name = e.target.formMusicName.value
    var url = e.target.formMusicUrl.value
    var video = e.target.formMusicVideo.value
    var category = e.target.formCategory.value
    var htmlLyrics = '',
      htmlChord = ''

    if (lyrics) htmlLyrics = draftToHtml(convertToRaw(lyrics.getCurrentContent()))

    if (chord) htmlChord = draftToHtml(convertToRaw(chord.getCurrentContent()))
    // if (chord) htmlChord = chord.getCurrentContent().getPlainText()
    // if (chord) htmlChord = document.getElementsByName('text-chord')[0].innerHTML

    // console.log(htmlChord)

    // // return

    var subcategory = []
    if (selectedOption) {
      subcategory = selectedOption
    }

    const DATA = {
      name,
      url,
      category,
      subcategory,
      video,
      htmlLyrics,
      tom,
      htmlChord,
      currentMusic,
    }

    try {
      let res = ''
      if (currentMusic) {
        res = await musicaService.editMusic(DATA)
      } else {
        res = await musicaService.createMusic(DATA)
      }
      console.log('data', res.data.error)
      if (!res.data.error) {
        setTimeout(() => {
          navigate('/musicas/' + url)
        }, 1500)
      }
      setMessage(res.data.message)
      setShow(true)
      setLoading(false)
    } catch (e) {
      console.log('Erro addmussic: ', e)
      setLoading(false)
    }
  }

  useEffect(() => {
    async function loadMusic(music) {
      try {
        const res = await musicaService.getMusic(music)
        if (res.data) {
          var data = res.data
          document.getElementById('formMusicName').value = data.nome
          document.getElementById('formMusicUrl').value = data.url
          document.getElementById('formMusicVideo').value = data.videourl
          document.getElementById('formCategory').value = data.categoria

          setTom(data.tom)

          if (data.subcategoria) {
            setSelectedOption(JSON.parse(data.subcategoria))
          }

          setLyrics(convertHtmlToDraft(data.letra))

          const cifra = data.cifra.replaceAll('c>', 'ins>')
          setChord(convertHtmlToDraft(cifra))
          // console.log(cifra)
          document.getElementsByName('text-chord')[0].innerHTML = cifra
        } else {
          alert('Essa música ainda nao existe')
          navigate('/')
        }
      } catch (e) {
        console.log('error: ', e)
      }
    }

    if (currentMusic) {
      loadMusic(currentMusic)
    }
  }, [currentMusic, navigate])

  return (
    <S.ContainerMusic>
      <HeaderPage title={currentMusic ? 'Editar música' : 'Criar nova música'} />
      <S.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formMusicName">
            <Form.Label>
              <b>Nome da Música</b>
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome da música"
              onChange={(value) => changeNameMusic(value.target.value)}
            />
          </Form.Group>

          <Form.Label htmlFor="formMusicUrl">
            <b>URL da Música</b>
          </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">www..../musicas/</InputGroup.Text>
            <Form.Control
              required
              id="formMusicUrl"
              placeholder="exemplo: cordeiro-de-deus-shalom"
            />
          </InputGroup>

          <Form.Group className="mb-3" controlId="formMusicVideo">
            <Form.Label>
              <b>Embed do Video da Música</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: https://youtu.be/wFDcofGdlY  <coleque apenas 'wFDcofGdlY'>"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>
              <b>Categoria</b>
            </Form.Label>
            <Form.Select placeholder="selecione uma categoria" defaultValue={'outros'}>
              <option value="outros">Sem categoria</option>
              <option value="entrada">Entrada</option>
              <option value="perdao">Perdão</option>
              <option value="gloria">Glória</option>
              <option value="salmo">Salmo</option>
              <option value="aclamacao">Aclamação</option>
              <option value="ofertorio">Ofertório</option>
              <option value="santo">Santo</option>
              <option value="amem">Doxologia do Amém</option>
              <option value="cordeiro">Cordeiro</option>
              <option value="comunhao">Comunhão</option>
              <option value="pos-comunhao">Pós-comunhão</option>
              <option value="final">Final</option>
              <option disabled value="outros">
                ------------- Outros -------------
              </option>
              <option value="louvacao">Louvação</option>
              <option value="biblia">Entrada da Biblia</option>
              <option value="marianos">Cantos Marianos</option>
              <option value="familia">Família</option>
              <option value="espiritosanto">Espirito Santo</option>
              <option value="cura">Cura</option>
              <option value="aspersao">Aspersão</option>
              <option value="especial">Especial</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubCategory">
            <Form.Label>
              <b>Sub-Categorias</b>
            </Form.Label>
            <Select
              className="sub-category"
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: 'var(--bs-border-color)',
                }),
                option: (base, { isFocused }) => ({
                  ...base,
                  backgroundColor: isFocused ? '#808080' : 'transparent',
                }),
              }}
              isMulti
              placeholder="Selecione uma sub-categoria"
            />
          </Form.Group>

          <EditLyrics lyrics={lyrics} setLyrics={setLyrics} />

          <EditChord lyrics={lyrics} chord={chord} setChord={setChord} tom={tom} setTom={setTom} />

          {/* <textarea className="text_class" name="text-chord"></textarea> */}

          <ToastMessage show={show} setShow={setShow} message={message} />

          <Button $variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Carregando....' : currentMusic ? 'Salvar Dados' : 'Adicionar Musica'}
          </Button>
        </Form>
      </S.Content>
    </S.ContainerMusic>
  )
}
