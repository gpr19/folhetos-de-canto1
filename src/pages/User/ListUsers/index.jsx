import { useState } from 'react'
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa'
import { TiExport } from 'react-icons/ti'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { ButtonNone, HeaderPage, Loading, Button, ModalConfirm } from '../../../components'
import { userService } from '../../../services'
import * as S from '../../styles'

export const ListUsers = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [user, setUser] = useState('')
  const { data, isFetching, isError, error, refetch } = useQuery('list-users', loadUsers)

  async function loadUsers() {
    const res = await userService.getUsers()
    return res.data
  }

  if (isFetching) {
    return <Loading height={20} />
  }

  if (isError) {
    return <h3>Erro ao carregar dados: {error?.response?.data?.message}</h3>
  }

  const handleDelete = async () => {
    try {
      const res = await userService.deleteUser(user)
      if (!res.data.error) {
        refetch()
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

    setShow(false)
  }

  return (
    <S.Container>
      <HeaderPage title="Usuários" pageTitle="Usuários - Folhetos de Canto" />
      <S.Content>
        <Button onClick={() => navigate('/users/cadastrar')}>
          <FaUserPlus size={20} />
          Cadastrar
        </Button>

        {data && (
          <S.Table variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Permissão</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nome}</td>
                  <td>{item.username}</td>
                  <td>{item.level}</td>
                  <td>
                    <S.Actions>
                      <ButtonNone
                        onClick={() => navigate(`/users/${item.username}`)}
                        title="Abrir perfil"
                      >
                        <TiExport size={18} />
                      </ButtonNone>
                      <ButtonNone
                        onClick={() => navigate(`/users/${item.username}/editar`)}
                        title="Editar"
                      >
                        <FaEdit color="#449a45" />
                      </ButtonNone>

                      <ButtonNone
                        disabled={item.username === 'gabriel.pacheco'}
                        onClick={() => {
                          setUser(item.username)
                          setShow(true)
                        }}
                        title="Excluir"
                      >
                        <FaTrash color="red" />
                      </ButtonNone>
                    </S.Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        )}

        <ModalConfirm show={show} setShow={setShow} handleConfirm={handleDelete} />
      </S.Content>
    </S.Container>
  )
}
