import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
export * from './musicsFunctions'

export function dataAtualFormatada(date) {
  var data = date.split('-'),
    dia = data[2],
    mes = data[1], //+1 pois no getMonth Janeiro começa com zero.
    ano = data[0]
  return dia + '/' + mes + '/' + ano
}

export function remover_acentos_espaco(str) {
  return str.normalize('NFD')
}

export function slugify(string) {
  return remover_acentos_espaco(string)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/---/g, '-')
    .replace(/--/g, '-')
}

export function convertHtmlToDraft(html) {
  const blocksFromHtml = htmlToDraft(html)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorState = EditorState.createWithContent(contentState)
  return editorState
}

export function print(element, uppercase = false, title = '') {
  const getElement = document.getElementsByClassName(element)[0]

  const html = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <title>${title} - Folhetos de Canto</title>
            <style>
                body{
                    font-family: system-ui;
                }
                c {
                    text-transform: initial;
                    font-weight: bold;
                    color: rgb(143, 67, 0);
                }
                .title{
                    font-size: 28px;
                    font-weight: bold;
                }
                .content{
                    font-size: 16px;
                    text-transform: uppercase;
                }
                .break { page-break-before: always; }
            </style>
        </head>
        <body>
            <div class="title">
                ${title}
            </div>
            <br/>
            <div class="content">
                ${getElement.innerHTML}
            </div>
        </body>
    </html>
`

  var screenPrint = window.open('about:blank')
  screenPrint.document.write(html)
  screenPrint.window.print()
  screenPrint.window.close()
}
