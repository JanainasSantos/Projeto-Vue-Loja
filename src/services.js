import axios from 'axios'

const axiosInstanced = axios.create({
  baseURL: ('http://localhost:3000/')
})

export const api = {
  get (endpoint) {
    return axiosInstanced.get(endpoint)
  },
  post (endpoint, body) {
    return axiosInstanced.post(endpoint, body)
  }
}
