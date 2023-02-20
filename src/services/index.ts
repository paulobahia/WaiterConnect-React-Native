import http from '../config/axios'
import { AuthAccountData, AuthWaiterData } from '../context/index'

export const getCategories = () => {
    return http.get('/api/categories/productsInfo')
}

export const getAccountsByWaiter = (payload) => {
    return http.post('/api/accounts/byWaiter', payload)
}

export const authAccount = (payload): Promise<AuthAccountData> => {
    return http.post('/api/accounts/auth', payload)
}

export const authWaiter = (payload): Promise<AuthWaiterData> => {
    return http.post('/api/users/auth', payload)
}