import { KeySignatures, Transposer } from 'chord-transposer'

export const musicsFunctions = {
  convertLyric(lyrics) {
    var converted = lyrics?.replaceAll('<p>', '').replaceAll('</p>', '<br/>')
    return converted
  },
  convertChord(chord) {
    var converted = chord
      ?.replaceAll('<p>', '')
      .replaceAll('</p>', '<br/>')
      .replaceAll('ins>', 'c>')
      .replaceAll(' ', '&nbsp;')
    return converted
  },
  getInnerText(chord) {
    var converted = chord
      ?.replaceAll('<p>', '')
      .replaceAll('</p>', '')
      .replaceAll('<ins>', '')
      .replaceAll('</ins>', '')
      .replaceAll('<strong>', '')
      .replaceAll('</strong>', '')
    return converted
  },
  changeTone(t, element = document) {
    var e = element.getElementsByTagName('c')
    // console.log('elemento: ', e)
    for (let i = 0; i < e.length; i++) {
      const element = e[i]
      // console.log('elemento: ', element.innerText);
      let newtone
      var newel = element.innerText

      if (t === 'up') {
        newtone = Transposer.transpose(newel).up(1).toString()
        newtone = sharpOnly(newtone)
      } else if (t === 'down') {
        newtone = Transposer.transpose(newel).down(1).toString()
        newtone = sharpOnly(newtone)
      }
      e[i].innerHTML = newtone
    }
  },
  changeToneToKey(key, from, element = document) {
    var e = element.getElementsByTagName('c')
    for (let i = 0; i < e.length; i++) {
      const element = e[i]
      let newtone
      var newel = element.innerText

      let semiTom = 0

      if (key !== 'null' && from !== 'null')
        semiTom = KeySignatures.valueOf(key).rank - KeySignatures.valueOf(from).rank

      newtone = Transposer.transpose(newel).up(semiTom).toString()

      newtone = sharpOnly(newtone)

      e[i].innerHTML = newtone
    }
  },
  changeToneToKeyById(id, key) {
    // console.log(id, key)
    var e = document.getElementById(id)

    let newtone
    var newel = e.innerText
    try {
      if (key === 'up') {
        newtone = Transposer.transpose(newel).up(1).toString()
      } else if (key === 'down') {
        newtone = Transposer.transpose(newel).down(1).toString()
      } else {
        newtone = key
      }
      newtone = sharpOnly(newtone)
    } catch (error) {
      alert('Erro ao mudar o tom')
      return false
    }

    e.innerHTML = newtone
    // newel = newtone
    return newtone
  },
  chanceFontSize(div, size) {
    const element = document.getElementsByClassName(div)[0]
    var fontSize = parseInt(window.getComputedStyle(element).fontSize)

    if (size === 'up') {
      element.style.fontSize = ++fontSize + 'px'
    } else {
      element.style.fontSize = --fontSize + 'px'
    }
  },
}

function sharpOnly(value) {
  // C D E F G A B
  value = value.replaceAll('Ab', 'G#')
  value = value.replaceAll('Db', 'C#')
  value = value.replaceAll('Eb', 'D#')
  value = value.replaceAll('Gb', 'F#')
  value = value.replaceAll('Cb', 'B')
  value = value.replaceAll('Bb', 'A#')
  // value = value.replaceAll('A#', 'B')
  return value
}
