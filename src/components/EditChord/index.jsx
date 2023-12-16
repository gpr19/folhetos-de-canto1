import { useEffect } from 'react'
import { Accordion, Form, ToggleButtonGroup } from 'react-bootstrap'
import { Editor } from 'react-draft-wysiwyg'
import { IoMdMusicalNote } from 'react-icons/io'
import { RxLetterCaseUppercase } from 'react-icons/rx'
import { TbMusic } from 'react-icons/tb'

import { EditorState, Modifier } from 'draft-js'
import { OrderedSet } from 'immutable'

import * as S from './styles'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const optionTom = [
  { value: 'null', label: 'Sem Tom' },
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

// const minorOptions = ['Cm', 'Dm', 'Em', 'Fm', 'Gm', 'Am', 'Bm', '#m']

const GetTextInLyrics = ({ lyrics, setChord, editorState, onChange }) => {
  const getCurrentBlock = (editorState) => {
    const currentSelection = editorState.getSelection()
    const blockKey = currentSelection.getStartKey()
    return editorState.getCurrentContent().getBlockForKey(blockKey)
  }

  const getCurrentText = (editorState) => {
    const currentBlock = getCurrentBlock(editorState)
    const blockText = currentBlock.getText()
    return blockText
  }

  function handleGetText() {
    setChord(lyrics)
  }

  const handleChord = () => {
    const inlineStyle = editorState.getCurrentInlineStyle()
    const isUnderline = inlineStyle.toString().includes('UNDERLINE')

    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection().merge({
        anchorOffset: 0,
        focusOffset: getCurrentText(editorState).length,
      }),
      getCurrentText(editorState),
      isUnderline ? OrderedSet.of('') : OrderedSet.of('UNDERLINE'),
    )

    onChange(EditorState.push(editorState, contentState, 'change-inline-style'))
  }

  function upperCase() {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      window.getSelection().toString().toUpperCase(),
      editorState.getCurrentInlineStyle(),
    )
    onChange(EditorState.push(editorState, contentState, 'insert-characters'))
  }

  return (
    <div style={{ display: 'flex' }}>
      <div className="rdw-option-wrapper chord-option" onClick={handleChord}>
        <IoMdMusicalNote size={20} />
      </div>
      <div className="rdw-option-wrapper" onClick={upperCase}>
        <RxLetterCaseUppercase />
      </div>
      <div className="rdw-option-wrapper" onClick={handleGetText}>
        Pegar texto do Editar Letra
      </div>
    </div>
  )
}

export function EditChord({ lyrics, chord, setChord, tom, setTom }) {
  useEffect(() => {
    var title = document.getElementsByClassName('chord-option')[0]
    if (title) {
      title.title = 'Tornar linha como cifra'
    }
  })

  const handleChange = (e) => {
    setTom(e)
  }

  return (
    <Accordion className="mb-3" defaultActiveKey="0">
      <Accordion.Item>
        <Accordion.Header>
          <TbMusic />
          <b> Editar Cifra</b>
        </Accordion.Header>
        <Accordion.Body>
          <S.ContanerTom>
            <span>Tom original: </span>
            <Form.Group controlId="formTom">
              <ToggleButtonGroup type="radio" value={tom} name="optionTom" onChange={handleChange}>
                {optionTom.map((item, index) => (
                  <S.ToggleButton
                    key={index}
                    id={`tbg-check-${index}`}
                    value={item.value}
                    variant="outline-info"
                  >
                    {item.label}
                  </S.ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Form.Group>
          </S.ContanerTom>
          <Editor
            editorState={chord}
            onEditorStateChange={setChord}
            wrapperClassName="lyrics-wrapper"
            editorClassName="lyrics-editor"
            stripPastedStyles={true}
            toolbarCustomButtons={[
              <GetTextInLyrics key={lyrics} lyrics={lyrics} setChord={setChord} />,
            ]}
            toolbar={{
              options: ['inline', 'history'],
              inline: {
                options: ['bold'],
                // underline: {
                //   icon: musicnote,
                //   className: 'chord-option',
                // },
              },
              history: {
                options: ['undo', 'redo'],
              },
            }}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
