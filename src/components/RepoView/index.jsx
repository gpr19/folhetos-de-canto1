import { useEffect } from 'react'

import { Transposer } from 'chord-transposer'

import { musicsFunctions } from '../../functions'
import * as S from './styles'

export function RepoView({ dataMusics, type }) {
  useEffect(() => {
    ;(() => {
      const elements = document.getElementsByClassName('content_cifra')

      for (let i = 0; i < elements.length; i++) {
        const { index, subindex } = elements[i].dataset
        const music = dataMusics[index].musics[subindex]
        let from = music.original_tom
        elements[i].innerHTML = musicsFunctions.convertChord(music.cifra_music)

        if (from === 'null') {
          from = Transposer.transpose(musicsFunctions.getInnerText(elements[i].innerText)).getKey()
            .majorKey
        }

        if (music.cifra_tom !== 'null' && music.cifra_tom !== music.original_tom)
          musicsFunctions.changeToneToKey(music.cifra_tom, from, elements[i])
      }
    })()
  })

  return (
    <S.Container>
      {dataMusics.map((item, index) => (
        <S.Content key={index}>
          {item.musics.length > 0 && (
            <div>
              <S.SectionTitle>{item.title}</S.SectionTitle>
              {item.musics?.map((music, subindex) => (
                <div key={subindex}>
                  <S.MusicTitle>{music.name_music}</S.MusicTitle>

                  {type === 'letra' ? (
                    <S.ContainerLyric
                      className="content_letra"
                      dangerouslySetInnerHTML={{
                        __html: musicsFunctions.convertLyric(music.letra_music),
                      }}
                    ></S.ContainerLyric>
                  ) : (
                    <S.ContainerChrod
                      className="content_cifra"
                      data-urlmusic={music.url_music}
                      data-index={index}
                      data-subindex={subindex}
                    />
                  )}
                  <S.Divisor className="break" />
                </div>
              ))}
            </div>
          )}
        </S.Content>
      ))}
    </S.Container>
  )
}
