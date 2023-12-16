import { Accordion } from 'react-bootstrap'
import { Editor } from 'react-draft-wysiwyg'
import { TbLetterA } from 'react-icons/tb'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export function EditLyrics({ lyrics, setLyrics }) {
  // console.log(musictone)
  // console.log(convertToRaw(lyrics.getCurrentContent()))

  return (
    <Accordion className="mb-3" defaultActiveKey="0">
      <Accordion.Item>
        <Accordion.Header>
          <TbLetterA />
          <b> Editar Letra</b>
        </Accordion.Header>
        <Accordion.Body>
          <Editor
            editorState={lyrics}
            onEditorStateChange={setLyrics}
            wrapperClassName="lyrics-wrapper"
            editorClassName="lyrics-editor"
            stripPastedStyles={true}
            toolbar={{
              options: ['inline', 'history'],
              inline: {
                options: ['bold'],
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
