import axios from '../utils/axios'

export const userLogin = (data) => axios.post('/api/login', data)