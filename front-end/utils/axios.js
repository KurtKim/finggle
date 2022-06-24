import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

service
    .interceptors
    .request
    .use(config => {
        // const token = getToken()
        // if (token) config.headers['Authorization'] = `Bearer ${token}`
        return config
    }, error => Promise.reject(error))

service
    .interceptors
    .response
    .use(
        response => response, 
        error => {
            alert(error.response.data.message)
            return Promise.reject(error)
        })

export default service