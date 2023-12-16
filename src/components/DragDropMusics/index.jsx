import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Accordion, Button, Form } from 'react-bootstrap'
import { BsPlusCircle, BsArrowDownUp } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { MdModeEdit } from 'react-icons/md'
import { RxDotFilled } from 'react-icons/rx'

import { OverlayTom } from '../OverlayTom'
import ModalAddMusic from './ModalAddMusic'
import ModalEditLabel from './ModalEditLabel'
import * as S from './styles'

export const DragDropMusics = ({ itemList, setItemList, dataMusics, changeTom = false }) => {
  const [modalShow, setModalShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [selItem, setSelItem] = useState('')

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(itemList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setItemList(items)
  }

  const handleAdd = () => {
    const newValue = document.getElementById('formNewValue').value

    if (newValue === '') return

    const find = itemList.findIndex((element) => element.title === newValue)

    const newPush = {
      title: newValue,
      musics: [],
    }

    if (find === -1) {
      setItemList((oldArray) => [...oldArray, newPush])
    } else {
      alert('Item já existente')
    }
  }

  const handleDelete = (index) => {
    const newList = itemList

    newList.splice(index, 1)

    const array = []
    newList.map((item) => array.push(item))

    setItemList(array)
  }

  const handleMusicDelete = (index, subindex) => {
    const items = Array.from(itemList)
    items[index].musics.splice(subindex, 1)

    setItemList(items)
  }

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Músicas</Accordion.Header>
        <Accordion.Body>
          <S.ContainerAdd>
            <Form.Group controlId="formNewValue" style={{ width: '100%' }}>
              <Form.Control type="input" placeholder="Adicionar novo item" />
            </Form.Group>
            <Button variant="success" onClick={() => handleAdd()}>
              Adicionar
            </Button>
          </S.ContainerAdd>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list-musics" type="musicas">
              {(provided) => (
                <S.ContainerList {...provided.droppableProps} ref={provided.innerRef}>
                  {itemList &&
                    itemList
                      .filter((item) => item.title !== undefined)
                      .map((item, key) => (
                        <Draggable key={item.title} draggableId={item.title} index={key}>
                          {(provided) => (
                            <Accordion className="mb-1" alwaysOpen key={key}>
                              <Accordion.Item
                                eventKey={key}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                              >
                                <Accordion.Header>
                                  <S.Header>
                                    <div>
                                      <BsArrowDownUp
                                        title="Clique e arraste para reordenar"
                                        className="me-2"
                                      />
                                      {item.title}
                                      <MdModeEdit
                                        className="ms-2"
                                        size={20}
                                        onClick={() => {
                                          setEditShow(true)
                                          setSelItem(key)
                                        }}
                                      />
                                    </div>
                                    <FaTrash
                                      size={20}
                                      title="Deletar sessão"
                                      onClick={() => handleDelete(key)}
                                    />
                                  </S.Header>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <S.ListMusics>
                                    <ul>
                                      {item.musics?.map((subitem, subkey) => {
                                        return (
                                          <li key={subkey}>
                                            <RxDotFilled size={20} />
                                            <a
                                              target="_blank"
                                              rel="noreferrer"
                                              href={'/musicas/' + subitem.url_music}
                                            >
                                              {subitem.name_music}
                                            </a>
                                            {changeTom && (
                                              <S.ChangeTom>
                                                Tom:
                                                <OverlayTom
                                                  tom={subitem.cifra_tom}
                                                  itemList={itemList}
                                                  setItemList={setItemList}
                                                  itemKey={key}
                                                  itemSubkey={subkey}
                                                  id={`${item.title}-${subitem.url_music}`}
                                                />
                                              </S.ChangeTom>
                                            )}
                                            <FaTrash
                                              size={15}
                                              title="Deletar música"
                                              onClick={() => handleMusicDelete(key, subkey)}
                                            />
                                          </li>
                                        )
                                      })}
                                      <S.ContainerBtn>
                                        <Button
                                          variant="outline-info"
                                          size="sm"
                                          onClick={() => {
                                            setModalShow(true)
                                            setSelItem(key)
                                          }}
                                        >
                                          <BsPlusCircle />
                                          <span>Adicionar nova música</span>
                                        </Button>
                                      </S.ContainerBtn>
                                    </ul>
                                  </S.ListMusics>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          )}
                        </Draggable>
                      ))}
                  {provided.placeholder}
                </S.ContainerList>
              )}
            </Droppable>
          </DragDropContext>

          <ModalAddMusic
            show={modalShow}
            set={setModalShow}
            item={selItem}
            itemList={itemList}
            setItemList={setItemList}
            data={dataMusics}
          />
          <ModalEditLabel
            show={editShow}
            setShow={setEditShow}
            // label={itemList[selItem].title}
            item={selItem}
            itemList={itemList}
            setItemList={setItemList}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
