import http from '../config/axios'

export const getCategories = () => {
    return http.get('/api/categories/productsInfo')
}

export const getAccountsByWaiter = (payload) => {
    return http.post('/api/accounts/byWaiter', payload)
}

export const authAccount = (payload) => {
    return http.post('/api/accounts/auth', payload)
}