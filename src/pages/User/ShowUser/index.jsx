import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { HeaderPage, Loading } from '../../../components'
import { userService } from '../../../services'
import * as S from '../../styles'

export const ShowUser = () => {
  const { userName } = useParams()
  const { data, isFetching, isError } = useQuery('user', loadUser)

  async function loadUser() {
    const res = await userService.getUser(userName)
    return res.data
  }

  if (isFetching) {
    return <Loading height={20} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados</h3>
  }

  console.log(data)

  return (
    <S.Container>
      <HeaderPage title={'Perfil: ' + userName} />
      <S.Content></S.Content>
    </S.Container>
  )
}
