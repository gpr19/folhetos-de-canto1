import { useParams } from 'react-router-dom'

import { ShowAllMusics } from './AllMusics'
import { ShowOneMusic } from './OneMusic'

export const Musics = () => {
  const params = useParams()

  if (!params.music) {
    return <ShowAllMusics />
  }

  return <ShowOneMusic music={params.music} />
}
