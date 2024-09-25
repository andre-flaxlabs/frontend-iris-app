import api from './api'

class AuthService {
  login(username: string, password: string) {
    const response = api.post('/api/token', {
      username,
      password
    })

    return response
  }
}
export default new AuthService()
