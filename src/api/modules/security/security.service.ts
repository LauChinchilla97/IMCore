import { httpClient } from '../../core/httpClient'
import { UsersDTO, LoginResponse, LoginRequest, MenuDTO } from './security.types'

export const securityService = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse, LoginRequest>('Auth/loginUser', data),

  getUsers: () => httpClient.get<UsersDTO[]>('Users'),
  getMenu: () => httpClient.get<MenuDTO[]>('Menu'),
}