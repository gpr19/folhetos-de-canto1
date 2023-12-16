import { api } from '../api'

export const userService = {
  login(data) {
    const endpoint = `/user/auth/login`
    return api.post(endpoint, data)
  },
  validate(data) {
    const endpoint = `/user/auth/validate/${data}`
    return api.get(endpoint)
  },
  getUsers() {
    const endpoint = `/user`
    return api.get(endpoint, { username: 'teste', params: { password: 'teste' } })
  },
  getUser(data) {
    const endpoint = `/user/${data}`
    return api.get(endpoint)
  },
  createUser(data) {
    const endpoint = `/user`
    return api.post(endpoint, data)
  },
  editUser(user, data) {
    const endpoint = `/user/${user}`
    return api.put(endpoint, data)
  },
  deleteUser(user) {
    const endpoint = `/user/${user}`
    return api.delete(endpoint)
  },
}
