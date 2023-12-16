import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useQuery } from 'react-query'

import { HeaderPage, Loading, Paginator } from '../../../components'
import { musicaService } from '../../../services'
import * as S from '../styles'

export const ShowAllMusics = () => {
  const { data, isFetching, isError, isSuccess } = useQuery('musicas', loadAllMusics)
  const [filterResult, setFilterResult] = useState([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState()

  const LIMIT = Math.floor(window.innerHeight / 33)

  async function loadAllMusics() {
    const res = await musicaService.getAllMusics()
    return res.data
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    var updatedList = [...data]
    updatedList = updatedList.filter((item) => {
      return (
        item.nome
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            value
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
          ) !== false
      )
    })
    setTotal(updatedList.length)
    setFilterResult(updatedList.slice(offset, offset + LIMIT))
  }

  useEffect(() => {
    if (isSuccess) {
      setTotal(data.length)
      setFilterResult(data.slice(offset, offset + LIMIT))
    }
  }, [isSuccess, offset, setFilterResult, data, LIMIT])

  if (isFetching) {
    return <Loading lines={10} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  return (
    <S.Container>
      <HeaderPage pageTitle="Todas as Músicas - Folhetos de Canto" />
      <Form className="d-flex m-2">
        <Form.Control
          type="search"
          placeholder="Pesquisar..."
          aria-label="Search"
          onChange={handleInputChange}
        />
      </Form>

      {data && (
        <ul>
          {filterResult?.map((item, key) => {
            return (
              <div key={key}>
                <S.CustomLink to={'/musicas/' + item.url}>
                  {'> ' + item.nome.toUpperCase()}
                </S.CustomLink>
              </div>
            )
          })}
        </ul>
      )}
      {total > LIMIT && (
        <Paginator limit={LIMIT} total={total} offset={offset} setOffset={setOffset} />
      )}
    </S.Container>
  )
}
