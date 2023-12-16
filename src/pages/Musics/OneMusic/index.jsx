import { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Tab, Tabs } from 'react-bootstrap'
import { FiPrinter } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import { Transposer } from 'chord-transposer'
// import ChordSheetJS, { Chord, ChordSheetSerializer, Key, Song } from 'chordsheetjs'

import {
  ButtonGroupLyric,
  ButtonGroupTranspose,
  HeaderPage,
  Loading,
  ModalConfirm,
} from '../../../components'
import { AuthContext } from '../../../contexts'
import { musicsFunctions, print } from '../../../functions'
import { musicaService } from '../../../services'
import * as S from '../styles'

export const ShowOneMusic = ({ music }) => {
  const navigate = useNavigate()

  const { data, isFetching, isError } = useQuery('musica', loadMusic)
  const { user } = useContext(AuthContext)

  const [show, setShow] = useState(false)

  // const UGchordSheet = `
  //         G   A   G   D

  //         G   A   G   D

  //             G              C             Am
  //         Oh, joys arise, the sun has come again to hold you
  //         G                              D
  //         Sailing out the doldrums of the week
  //             G               Em               A
  //         The polyphonic prayer is here, it's all around you
  //         `.substring(1)

  async function loadMusic() {
    const res = await musicaService.getMusic(music)
    return res.data
  }

  async function handleDelete() {
    const res = await musicaService.deleteMusic(music)

    if (!res.data.error) {
      navigate('/musicas')
    } else {
      alert(res.data.message)
    }
  }

  // const handleTranspose = (semitome) => {
  //   let dataset = parseInt(document.getElementById('song').dataset.semi)

  //   const trans = dataset + semitome

  //   const parser = new ChordSheetJS.UltimateGuitarParser()
  //   const song = parser.parse(UGchordSheet)
  //   const formatter = new ChordSheetJS.HtmlDivFormatter()
  //   const disp = formatter.format(song.transpose(trans))
  //   document.getElementById('song').dataset.semi = trans
  //   document.getElementById('song').innerHTML = `${disp}`
  // }

  useEffect(() => {
    ;(() => {
      // console.log(data.cifra)
      if (data?.cifra === '') return
      const element = document.getElementsByClassName('content_cifra')
      if (element.length > 0) {
        try {
          var chords = musicsFunctions.convertChord(data?.cifra)
          // var chords = UGchordSheet

          // const parser = new ChordSheetJS.UltimateGuitarParser()
          // const song = parser.parse(chords)

          // const formatter = new ChordSheetJS.HtmlDivFormatter()
          // const disp = formatter.format(song)

          // document.getElementById('song').innerHTML = `${disp}`

          var isTomAvailable = data?.tom !== 'null' ? true : false
          var from = Transposer.transpose(musicsFunctions.getInnerText(data?.cifra)).getKey()
            .majorKey
          var key = isTomAvailable
            ? data?.tom
            : Transposer.transpose(musicsFunctions.getInnerText(data?.cifra)).getKey().majorKey

          var tom = isTomAvailable
            ? `<strong class="tom_music">Tom: <c>${data?.tom}</c></strong><br/><br/>`
            : ''
          var addTom = `${tom} ${chords}`
          element[0].innerHTML = addTom
          // console.log(Transposer.transpose(musicsFunctions.getInnerText(data?.cifra)).getKey())
          if (data?.tom && data?.tom !== 'null' && isTomAvailable && key !== from) {
            musicsFunctions.changeToneToKey(data.tom, from)
            var eltom = element[0].getElementsByClassName('tom_music')
            eltom[0].innerHTML = `<strong class="tom_music">Tom: <c>${data?.tom}</c></strong> `
          }
        } catch (error) {
          alert('Error: cifra não encontrada')
        }
      }
    })()
  })

  if (isFetching) {
    return <Loading />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  return (
    <S.Container style={{ alignItems: 'center' }}>
      <HeaderPage title={data?.nome} pageTitle={data?.nome + ' - Folhetos de Canto'} />
      <S.Content>
        {user?.level === 'admin' && (
          <S.ContainerAdd>
            <Button as={Link} to={'/musicas/' + music + '/editar'} variant="outline-success">
              Editar Música
            </Button>
            <Button variant="outline-danger" onClick={() => setShow(true)}>
              Excluir Música
            </Button>
          </S.ContainerAdd>
        )}

        {data?.videourl && (
          <S.ContainerVideo>
            <iframe
              width="100%"
              height="315"
              src={'https://www.youtube-nocookie.com/embed/' + data?.videourl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </S.ContainerVideo>
        )}

        <Tabs defaultActiveKey="letra" justify className="mb-4">
          <Tab eventKey="letra" title="Letra">
            <ButtonGroupLyric content="content_letra">
              <ButtonGroup size="sm">
                <Button variant="info" onClick={() => print('content_letra', true, data.nome)}>
                  <FiPrinter />
                </Button>
              </ButtonGroup>
            </ButtonGroupLyric>

            <S.ContainerLyric
              className="content_letra"
              dangerouslySetInnerHTML={{ __html: musicsFunctions.convertLyric(data?.letra) }}
            ></S.ContainerLyric>
          </Tab>

          <Tab eventKey="cifra" title="Cifra">
            <S.Center>
              <ButtonGroupLyric content="content_cifra" />
              <ButtonGroupTranspose>
                <ButtonGroup size="sm">
                  <Button variant="info" onClick={() => print('content_cifra', false, data.nome)}>
                    <FiPrinter />
                  </Button>
                  {/* <Button variant="danger" onClick={() => handleTranspose(-1)}>
                    teste-
                  </Button>
                  <Button variant="danger" onClick={() => handleTranspose(1)}>
                    teste+
                  </Button> */}
                </ButtonGroup>
              </ButtonGroupTranspose>
            </S.Center>
            <S.ContainerChrod className="content_cifra">
              <div className="middle-container">
                <div className="song-container" id="song" data-semi={0}></div>
              </div>
            </S.ContainerChrod>
          </Tab>
        </Tabs>
      </S.Content>
      <ModalConfirm show={show} setShow={setShow} handleConfirm={handleDelete} />
    </S.Container>
  )
}
