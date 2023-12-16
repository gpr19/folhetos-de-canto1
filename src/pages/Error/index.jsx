import { useErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

export const Error = ({ error, resetErrorBoundary }) => {
  const { resetBoundary } = useErrorBoundary()
  const navigate = useNavigate()

  const handleNavigateToHome = () => {
    resetBoundary()
    resetErrorBoundary()
    navigate('/')
  }

  return (
    <div>
      <h1>Erro não esperado, tente atualizar a pagina</h1>
      <h5>Detalhes: {error?.message}</h5>
      {/* {error.response.data && <h6>{error.response.data.message}</h6>} */}
      <button onClick={handleNavigateToHome}>Tente Novamente</button>
    </div>
  )
}
