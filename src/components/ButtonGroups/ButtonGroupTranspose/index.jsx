import { Button, ButtonGroup } from 'react-bootstrap'
import { ImMinus, ImPlus } from 'react-icons/im'

import { musicsFunctions } from '../../../functions'
import * as S from './styles'

export const ButtonGroupTranspose = ({ content = document, children }) => {
  return (
    <S.Container>
      <ButtonGroup size="sm">
        <Button variant="info" onClick={() => musicsFunctions.changeTone('down', content)}>
          <ImMinus /> ½
        </Button>
        <Button variant="info" disabled>
          Tom
        </Button>
        <Button variant="info" onClick={() => musicsFunctions.changeTone('up', content)}>
          <ImPlus /> ½
        </Button>
      </ButtonGroup>
      {children}
    </S.Container>
  )
}
