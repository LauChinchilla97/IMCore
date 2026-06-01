import { httpClient } from '../../core/httpClient'
import { ExecutionResponse } from '../response.type'
import { UsersDTO, LoginResponse, LoginRequest, MenuDTO } from './security.types'

const schema = 'Security'
export const securityService = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse, LoginRequest>(`${schema}/loginUser`,data),
  getUsers: () => httpClient.get<ExecutionResponse<UsersDTO[]>>(`${schema}/Users`),
  getMenu: (userCode: string) => httpClient.get<ExecutionResponse<MenuDTO[]>>(`${schema}/Menu?user_Code=${userCode}`),
}