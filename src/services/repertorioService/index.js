import { api } from '../api'

// const headerMultiData = { headers: { 'Content-Type': 'multipart/form-data' } }

export const repertorioService = {
  getAll(username) {
    const endpoint = `/repertorio/${username}`
    return api.get(endpoint)
  },
  getUnique(data) {
    const endpoint = `/repertorio/one/${data}`
    return api.get(endpoint)
  },
  getOne(data, username) {
    const endpoint = `/repertorio/one/${data}/${username}`
    return api.get(endpoint)
  },
  createOne(data) {
    const endpoint = `/repertorio/`
    return api.post(endpoint, data)
  },
  deleteOne(data) {
    const endpoint = `/repertorio/${data}`
    return api.delete(endpoint)
  },
  editOne(data) {
    const endpoint = `/repertorio/${data}`
    return api.put(endpoint, data)
  },
}
