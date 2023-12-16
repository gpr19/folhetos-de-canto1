import { useRef } from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap'

import { musicsFunctions } from '../../functions'
import * as S from './styles'

const optionTom = [
  { value: 'A', label: 'A' },
  { value: 'A#', label: 'A#' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'C#', label: 'C#' },
  { value: 'D', label: 'D' },
  { value: 'D#', label: 'D#' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'F#', label: 'F#' },
  { value: 'G', label: 'G' },
  { value: 'G#', label: 'G#' },
]

export const OverlayTom = ({ id, tom, itemList, setItemList, itemKey, itemSubkey }) => {
  let ref = useRef(null)

  const handleChange = (key) => {
    const newTom = musicsFunctions.changeToneToKeyById(id, key)
    if (newTom) {
      itemList[itemKey].musics[itemSubkey].cifra_tom = newTom
      setItemList(itemList)
    }
  }

  return (
    <OverlayTrigger
      ref={ref}
      container={ref.current}
      trigger="click"
      overlay={
        <Popover id="popover-basic" style={{ maxWidth: 200 }}>
          <Popover.Body>
            <S.Header>
              <Button
                variant="light"
                onClick={() => handleChange('down')}
                disabled={tom === 'null' ? true : false}
              >
                -½ tom
              </Button>
              <Button
                variant="light"
                onClick={() => handleChange('up')}
                disabled={tom === 'null' ? true : false}
              >
                +½ tom
              </Button>
            </S.Header>
            <S.Body>
              {optionTom.map((t_item, t_key) => (
                <Button
                  style={{ width: 40 }}
                  key={t_key}
                  variant="light"
                  onClick={() => handleChange(t_item.value)}
                >
                  {t_item.label}
                </Button>
              ))}
            </S.Body>
          </Popover.Body>
        </Popover>
      }
      rootClose
    >
      <S.Tom id={id}>{tom === 'null' ? 'Sem tom' : tom}</S.Tom>
    </OverlayTrigger>
  )
}
