import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { CardRepo, HeaderPage, Loading } from '../../../components'
import { AuthContext } from '../../../contexts'
import { repertorioService } from '../../../services'
import * as S from '../styles'

export const ShowAllRepertorios = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { data, isFetching, isError, refetch } = useQuery('repertorios', loadAllRepertorios, {
    enabled: !!user?.username,
  })

  async function loadAllRepertorios() {
    const res = await repertorioService.getAll(user?.username)
    return res.data
  }

  if (isFetching) {
    return <Loading height={270} width="300px" lines={4} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  return (
    <S.Container>
      <HeaderPage pageTitle="Repertórios - Folhetos de Canto" />
      <S.Header>
        <Button variant="outline-success" onClick={() => navigate('/repertorios/adicionar')}>
          Adicionar Novo Repertório
        </Button>
      </S.Header>
      <S.Content>
        <S.ListRepo>
          {data.map((item, index) => (
            <CardRepo
              key={index}
              title={item.missa}
              id={item._id}
              date={item.data}
              refetch={refetch}
            />
          ))}
        </S.ListRepo>
      </S.Content>
    </S.Container>
  )
}
