import { api } from '../api'

const headerMultiData = { headers: { 'Content-Type': 'multipart/form-data' } }

export const missaService = {
  getNextDays() {
    const endpoint = `/missa`
    return api.get(endpoint)
  },
  getMissas() {
    const endpoint = `/missa/all`
    return api.get(endpoint)
  },
  getMissa(data) {
    const endpoint = `/missa/${data}`
    return api.get(endpoint)
  },
  getMissaByDate(data) {
    const endpoint = `/missa/date/${data}`
    return api.get(endpoint)
  },
  createMissa(data) {
    const endpoint = `/missa`
    return api.post(endpoint, data, headerMultiData)
  },
  editMissa(data) {
    const endpoint = `/missa/${data}`
    return api.put(endpoint, data, headerMultiData)
  },
  deleteMissa(data) {
    const endpoint = `/missa/${data}`
    return api.delete(endpoint)
  },
}
