import { useEffect, useState } from 'react'

import { api, userService } from '../../services'
import { useLocalStorage } from '../useLocalStorage'

export default function UserAuth() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useLocalStorage('token', '')

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      ;(async () => {
        try {
          const res = await userService.validate(token)
          if (res?.data?.data) {
            setUser(res.data.data)
          }
        } catch (error) {
          console.log(error)
        }
      })()
      setAuthenticated(true)
    }
    setLoading(false)
  }, [token])

  async function login(data) {
    const res = await userService.login(data)
    if (!res?.data.error) {
      setAuthenticated(true)
      setUser(res.data.data)
      setToken(res.data.token)
    }
    setLoading(false)
    return res.data
  }

  const logout = () => {
    setAuthenticated(false)
    setUser(null)
    setToken('')
    api.defaults.headers.Authorization = undefined
  }

  return { authenticated, login, logout, loading, setLoading, user, setUser }
}
