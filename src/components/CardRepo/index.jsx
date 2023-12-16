import { useState } from 'react'
import { FaTrash, FaExternalLinkAlt } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { dataAtualFormatada } from '../../functions'
import { repertorioService } from '../../services'
import { ModalConfirm } from '../ModalConfirm'
import * as S from './styles'

export const CardRepo = ({ title = String, date = String, id = String, refetch }) => {
  const [show, setShow] = useState(false)

  const handleDelete = async () => {
    try {
      const res = await repertorioService.deleteOne(id)
      if (!res.data.error) {
        refetch()
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          {title.substring(0, 35).trim()}
          {title.length > 35 && '...'}
        </S.Title>
        <S.Date>{dataAtualFormatada(date)}</S.Date>
      </S.Header>
      <S.Footer>
        <S.Actions>
          <S.Action onClick={() => setShow(true)}>
            <FaTrash />
          </S.Action>

          <S.Action as={Link} to={'/repertorios/' + id + '/editar'}>
            <MdModeEdit size={20} />
          </S.Action>
        </S.Actions>

        <S.Action as={Link} target="_blank" to={'/repertorios/' + id}>
          <FaExternalLinkAlt size={18} />
        </S.Action>
      </S.Footer>
      <ModalConfirm show={show} setShow={setShow} handleConfirm={handleDelete} />
    </S.Container>
  )
}
