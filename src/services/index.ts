import http from '../config/axios'

export const getCategories = () => {
    return http.get('/api/categories')
}