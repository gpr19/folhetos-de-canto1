import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useQuery } from 'react-query'

import { HeaderPage, Loading, Paginator } from '../../../components'
import { dataAtualFormatada } from '../../../functions'
import { missaService } from '../../../services'
import * as S from './styles'

export const ShowAllMissas = () => {
  const { data, isFetching, isError, isSuccess } = useQuery('missas', loadAllMissas)
  const [filterResult, setFilterResult] = useState([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState()

  const LIMIT = Math.floor(window.innerHeight / 33)

  async function loadAllMissas() {
    const res = await missaService.getMissas()
    return res.data
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    var updatedList = [...data]
    // console.log(updatedList, value)
    // return
    updatedList = updatedList.filter((item) => {
      const customSearch = dataAtualFormatada(item.data) + ' ' + item.missa
      return (
        customSearch
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
      <HeaderPage pageTitle="Todas as Missas - Folhetos de Canto" />
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
                <S.CustomLink to={'/missa/' + item.url}>
                  {'> ' + dataAtualFormatada(item.data) + ' - ' + item.missa.toUpperCase()}
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
