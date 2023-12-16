import { useParams } from 'react-router-dom'

import { PrivateRute } from '../../routes/PrivateRoute'
import { ShowAllRepertorios } from './AllRepertorios'
import { ShowOneRepertorio } from './OneRepertorio'

export const Repertorios = () => {
  const { repertorio: currentRepertorio } = useParams()

  if (!currentRepertorio) {
    return <PrivateRute Component={ShowAllRepertorios} authorization={false} />
  }

  return <ShowOneRepertorio repertorio={currentRepertorio} />
}
