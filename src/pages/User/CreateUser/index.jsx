import { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { HeaderPage } from '../../../components'
import { userService } from '../../../services'
import { Button } from '../../Login/styles'
import * as S from '../../styles'

export const CreateUser = () => {
  const { userName } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const form = event.currentTarget
    const name = event.target.name.value
    const username = event.target.username.value
    const email = event.target.email.value

    const password_first = event.target.password_first.value
    const password_confirm = event.target.password_confirm.value
    const level = event.target.level.value

    if (form.checkValidity() === true) {
      if (!userName && !password_confirm && !password_first) {
        setMessage('Você precisa digitar uma senha')
      } else {
        if (password_confirm === password_first) {
          const user = {
            nome: name,
            username,
            email,
            level,
            ...(password_first && { senha: password_first }),
          }

          try {
            const endpoint = userName
              ? userService.editUser(userName, user)
              : userService.createUser(user)
            const res = await endpoint

            if (res.data && !res.data.error) {
              setMessage(res.data.message)
            }
          } catch (error) {
            setMessage(error.response.data.message)
          }
        } else {
          setMessage('Senhas precisam ser iguais')
        }
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (userName) {
      ;(async () => {
        try {
          const res = await userService.getUser([userName])

          if (res.data.error) return setMessage(res.data.message)

          if (res.data && !res.data.error) {
            const data = res.data
            document.getElementById('name').value = data.nome
            document.getElementById('username').value = data.username
            document.getElementById('email').value = data.email
            document.getElementById('level').value = data.level
          }
        } catch (error) {
          setMessage(error.response.data.message)
        }
      })()
    }
  }, [userName])

  return (
    <S.ContainerCreate>
      <S.ContentCreate>
        <HeaderPage
          title={userName ? 'Editar usuário' : 'Criar novo usuário'}
          pageTitle={
            userName
              ? 'Editar usuário - Folhetos de Canto'
              : 'Criar novo usuário - Folhetos de Canto'
          }
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control required type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Usuário</Form.Label>
            <Form.Control required type="username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" />
          </Form.Group>

          <S.Grid>
            <Form.Group className="mb-3" controlId="password_first">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password_confirm">
              <Form.Label>Confirmar Senha </Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </S.Grid>

          <Form.Group className="mb-3" controlId="level">
            <Form.Label>Tipo de Conta </Form.Label>
            <Form.Select size="lg">
              <option value="membro">Membro</option>
              <option value="moderador">Moderador</option>
              <option value="admin">Administrador</option>
            </Form.Select>
          </Form.Group>

          {message && <S.Message>{message}</S.Message>}
          <Button full="true" type="submit">
            {isLoading ? <Spinner /> : userName ? 'Salvar' : 'Cadastrar'}
          </Button>
        </Form>
      </S.ContentCreate>
    </S.ContainerCreate>
  )
}
