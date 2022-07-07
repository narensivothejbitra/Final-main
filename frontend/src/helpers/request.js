import axios from 'axios'
const staticUrl = "https://global-responsive-backend.herokuapp.com/" || 'http://localhost:8000'

export const request = (extra={}) => {
    return axios.create({
        baseURL: staticUrl,
        headers: {
            'Content-Type': "application/json",
            Accept: 'application/json',
            ...extra.headers
        }
    })
}