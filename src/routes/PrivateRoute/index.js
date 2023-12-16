import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AuthContext } from '../../contexts'

export const PrivateRute = ({ Component, authorization = true }) => {
  const { loading, authenticated, user } = useContext(AuthContext)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!authenticated) {
    return <Navigate to={'/login'} />
  }

  if (authorization) {
    if (user?.level !== 'admin' && user?.level !== 'moderador') {
      return <h1>Sem permissão</h1>
    }
  }
  return <Component />
}
