import { api } from '../api'

export const musicaService = {
  getAllMusics() {
    const endpoint = `/musica`
    return api.get(endpoint)
  },
  getMusic(data) {
    const endpoint = `/musica/${data}`
    return api.get(endpoint)
  },
  createMusic(data) {
    const endpoint = `/musica`
    return api.post(endpoint, data)
  },
  editMusic(data) {
    const endpoint = `/musica/${data}`
    return api.put(endpoint, data)
  },
  deleteMusic(data) {
    const endpoint = `/musica/${data}`
    return api.delete(endpoint)
  },
}
