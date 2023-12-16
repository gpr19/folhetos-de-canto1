import { Button, ButtonGroup } from 'react-bootstrap'
import { AiOutlineFontSize } from 'react-icons/ai'
import { ImMinus, ImPlus } from 'react-icons/im'

import { musicsFunctions } from '../../../functions'
import * as S from './styles'

export const ButtonGroupLyric = ({ content = '', children }) => {
  return (
    <S.Container>
      <ButtonGroup size="sm">
        <Button variant="info" onClick={() => musicsFunctions.chanceFontSize(content, 'down')}>
          <ImMinus />
        </Button>
        <Button variant="info" disabled>
          <AiOutlineFontSize />
        </Button>
        <Button variant="info" onClick={() => musicsFunctions.chanceFontSize(content, 'up')}>
          <ImPlus />
        </Button>
      </ButtonGroup>
      {children}
    </S.Container>
  )
}
