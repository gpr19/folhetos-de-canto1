import { useState } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { BiSolidSlideshow } from 'react-icons/bi'
import { FiPrinter } from 'react-icons/fi'
import { IoCloseCircle } from 'react-icons/io5'
import { useQuery } from 'react-query'

import { ButtonNone, HeaderPage, Loading, RepoView, SlideShow } from '../../../components'
import { dataAtualFormatada, print } from '../../../functions'
import { repertorioService } from '../../../services'
import * as S from './styles'

export const ShowOneRepertorio = ({ repertorio }) => {
  const { data, isFetching, isError } = useQuery('repertorio', loadRepertorio)
  const [showSlide, setShowSlide] = useState(false)
  const [type, setType] = useState('letra')

  async function loadRepertorio() {
    const res = await repertorioService.getUnique(repertorio)
    return res.data
  }

  if (isFetching) {
    return <Loading lines={5} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  const handleSlide = (type) => {
    setShowSlide(!showSlide)
    setType(type)
  }

  return (
    <S.Container>
      <HeaderPage pageTitle={data[0].missa + ' - Folhetos de Canto'} />
      <S.Header>
        <h1>{data[0].missa}</h1>
        <h3>{dataAtualFormatada(data[0].data)}</h3>
      </S.Header>
      <S.Content>
        <Tabs defaultActiveKey="letra" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="letra" title="Letras">
            <Button variant="info" onClick={() => print('repo_letras', true, data[0].missa)}>
              <FiPrinter /> Imprimir Letras
            </Button>
            <Button className="m-2" variant="info" onClick={() => handleSlide('letra')}>
              <BiSolidSlideshow /> Modo Slide
            </Button>
            <div className="repo_letras">
              <RepoView dataMusics={JSON.parse(data[0].musicas)} type={'letra'} />
            </div>
          </Tab>

          <Tab eventKey="cifra" title="Cifras">
            <Button variant="info" onClick={() => print('repo_cifras', false, data[0].missa)}>
              <FiPrinter /> Imprimir Cifras
            </Button>
            <Button className="m-2" variant="info" onClick={() => handleSlide('cifra')}>
              <BiSolidSlideshow /> Modo Slide
            </Button>
            <div className="repo_cifras">
              <RepoView dataMusics={JSON.parse(data[0].musicas)} type={'cifra'} />
            </div>
          </Tab>
        </Tabs>
      </S.Content>

      <S.ContainerSlide $show={showSlide}>
        <S.ContentSlide>
          <S.HeaderSlide>
            <S.SectionTitle>{data[0].missa}</S.SectionTitle>
            <ButtonNone onClick={handleSlide}>
              <IoCloseCircle size={30} />
            </ButtonNone>
          </S.HeaderSlide>

          <S.BodySlide>
            <SlideShow data={JSON.parse(data[0].musicas)} type={type} initial={0} />
          </S.BodySlide>
        </S.ContentSlide>
      </S.ContainerSlide>
    </S.Container>
  )
}
