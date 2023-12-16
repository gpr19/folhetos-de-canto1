import { Button, Modal } from 'react-bootstrap'

export const ModalConfirm = ({ show, setShow, handleConfirm }) => {
  const handleClose = () => setShow(false)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar</Modal.Title>
      </Modal.Header>
      <Modal.Body>Deseja realmente confirmar essa ação?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
