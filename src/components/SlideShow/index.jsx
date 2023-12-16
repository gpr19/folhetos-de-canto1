import { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Transposer } from 'chord-transposer'

import { musicsFunctions } from '../../functions'
import * as S from './styles'

export const SlideShow = ({ data, type, initial }) => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  useEffect(() => {
    ;(() => {
      const elements = document.getElementsByClassName('content_cifra')

      for (let i = 0; i < elements.length; i++) {
        const { index, subindex } = elements[i].dataset
        const music = data[index].musics[subindex]
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
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      defaultActiveIndex={initial}
      interval={null}
      keyboard={true}
      indicators={true}
    >
      {data.map((item, key) => (
        <Carousel.Item key={key}>
          <S.Content style={{ height: '90vh' }}>
            {/* {console.log(item)} */}
            {item.musics.map((subitem, subkey) => (
              <div key={subkey}>
                <S.MusicTitle>{subitem.name_music}</S.MusicTitle>
                {type === 'letra' ? (
                  <S.ContainerLyric
                    className="content_letra"
                    dangerouslySetInnerHTML={{
                      __html: musicsFunctions.convertLyric(subitem.letra_music),
                    }}
                  ></S.ContainerLyric>
                ) : (
                  <S.ContainerChrod
                    className="content_cifra"
                    data-urlmusic={subitem.url_music}
                    data-index={key}
                    data-subindex={subkey}
                  />
                )}
              </div>
            ))}
          </S.Content>
          <Carousel.Caption>
            <h3>{item.title}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
