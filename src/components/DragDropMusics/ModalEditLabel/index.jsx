import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function ModalEditLabel({ show, setShow, item, itemList, setItemList }) {
  const handleClose = () => {
    setShow(false)
  }

  const handleConfirm = () => {
    var element = document.getElementById('newLabel')
    itemList[item].title = element.value
    setItemList(itemList)
    handleClose()
  }

  useEffect(() => {
    var element = document.getElementById('newLabel')

    if (element) {
      element.value = itemList[item].title
    }
  }, [show, item, itemList])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Control required type="text" id="newLabel" placeholder="Nome da sessão" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
