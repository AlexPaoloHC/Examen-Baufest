export const REACT_APP_API_URL = "https://rickandmortyapi.com/api";

const headers = {
    'Content-Type': 'application/json'
}
/**
 * HTTP - GET
 * @param {string} url
 * @returns Promise
 */
const get = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    const rpta = await response.json()
    return rpta
}
/**
 * HTTP - POST
 * @param {string} url
 * @returns Promise
 */
const post = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    })
    const rpta = await response.json()
    return rpta
}
/**
 * HTTP - PUT
 * @param {string} url
 * @param {object} body
 * @returns Promise
 */
const put = async (url, body) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers,
        body
    })
    const rpta = await response.json()
    return rpta
}
/**
 * HTTP - DELETE
 * @param {string} url
 * @param {object} body
 * @returns Promise
 */
const _delete = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers
    })
    const rpta = await response.json()
    return rpta
}
  
export const http = {
    get,
    post,
    put,
    delete: _delete
}