import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HeaderPage } from '../../components'
import { AuthContext } from '../../contexts/auth-context'
import * as S from './styles'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { handleLogin, loading } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = e.target
    const response = await handleLogin({
      username: data.username.value,
      password: data.password.value,
    })

    // console.log(response)

    if (response?.error) {
      setError(response.message)
    } else {
      navigate('/')
    }
  }

  return (
    <S.Container>
      <S.Content>
        <HeaderPage pageTitle="Login - Folhetos de Canto" />
        <S.Card>
          <h2>Faça o login</h2>
          <form onSubmit={handleSubmit}>
            <S.InputGroup>
              <label htmlFor="username">Usuário</label>
              <S.Input type="text" placeholder="nome.sobrenome" id="username" />
            </S.InputGroup>
            <S.InputGroup>
              <label htmlFor="password">Senha</label>
              <S.Input type="password" placeholder="senha" id="password" />
            </S.InputGroup>
            {error && <S.ErrorLabel>{error}</S.ErrorLabel>}

            <S.Button disabled={loading} type="subimit" $full="true">
              {loading ? 'Carregando...' : 'Entrar'}
            </S.Button>
          </form>
        </S.Card>
      </S.Content>
    </S.Container>
  )
}
