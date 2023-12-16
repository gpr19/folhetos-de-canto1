import { Toast, ToastContainer } from 'react-bootstrap'

import * as S from './styles'

export function ToastMessage({
  show = Boolean,
  setShow = Function,
  message = Array,
  delay = 3000,
  title = 'Menssagem',
}) {
  return (
    <S.Container $show={show}>
      <ToastContainer className="p-3" position="bottom-center">
        <Toast onClose={() => setShow(false)} show={show} delay={delay} autohide>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </S.Container>
  )
}
