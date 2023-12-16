import { Accordion as RBAccordion } from 'react-bootstrap'
import { Link as RRLink } from 'react-router-dom'

import { DateCalendar as DCDatacalendar } from '@mui/x-date-pickers'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContainerAdd = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  * {
    font-size: 16px;
  }
`

export const MissaHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.h1``

export const SubTitle = styled.h3``

export const Img = styled.img`
  /* width: 100%; */
  height: 200px;
  object-fit: cover;
`

MissaHeader.Title = Title
MissaHeader.SubTitle = SubTitle
MissaHeader.Img = Img

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  .input-group,
  .form-control,
  .accordion-button,
  .DraftEditor-root,
  .DraftEditor-editorContainer,
  .public-DraftStyleDefault-block {
    position: inherit;
  }
`

export const ContentMusics = styled.div`
  font-size: 20px;
`

export const Accordion = styled(RBAccordion)`
  margin: 20px;
  font-size: 14px;

  button {
    color: ${(props) => props.theme.colors.black};
    font-size: 16px;
    gap: 10px;
  }
  .accordion-button {
    position: inherit;
  }
  .accordion-body {
    background-color: ${(props) => props.theme.colors.white};
  }
`

export const Link = styled(RRLink)``

Accordion.Link = Link

export const DateCalendar = styled(DCDatacalendar)`
  background-color: var(--bs-tertiary-bg);
  border: 1px solid #ccc;

  > div * {
    color: ${(props) => props.theme.colors.black};
  }
`
