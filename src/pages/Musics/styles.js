import { Link } from 'react-router-dom'

import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
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

  .text_class {
    width: 100%;
  }
`

export const Center = styled.div`
  display: flex;
  gap: 10px;
  /* flex-direction:  */
`

export const ContainerMusic = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const ContainerVideo = styled.div`
  /* display: block; */
  align-self: center;
  width: 100%;
  max-width: 560px;
`
export const ContainerLyric = styled.div`
  text-transform: uppercase;
`
export const ContainerChrod = styled.div`
  /* border: 1px solid darkgrey; */
  /* border-radius: 5px; */
  text-transform: uppercase;

  & c {
    text-transform: initial;
    color: #f70;
    font-weight: 700;
  }
  .chord {
    text-transform: initial;
    min-height: 20px;
    color: #333333;
    font-size: 14.5px;
    font-weight: bold;
    /*div.chord includes other white space */
    /* but can fix in ChordSheetJS parser: add wrapper div */
    /*background-color: #cccccc; */
  }
  .row {
    > * {
      width: auto !important;
    }
  }
`

export const CustomLink = styled(Link)`
  &:hover {
    color: blue;
    text-decoration: underline;
  }
`
