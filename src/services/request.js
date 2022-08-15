import {
  camelizeObject,
  underscoreObject,
  getQueryString,
  isObjectEmpty,
  isSuccess,
} from '../lib/utilities/object'

const sendRequest = (url, method = 'GET', data = {}) => {
  const baseURL = 'http://localhost:3000'
  const namespace = 'api'
  url = `${baseURL}/${namespace}/${url}`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const requestBody = {
    method,
    headers,
  }
  if (data) {
    data = underscoreObject(data)
    requestBody.body = JSON.stringify(data)
  }
  return fetch(url, requestBody).then(checkStatus)
}

const checkStatus = (response) => {
  if (typeof response === 'object') {
    const { status } = response
    if (isSuccess(status)) {
      if (response.headers.get('Content-Type') === 'application/json') {
        if (status === 204) {
          // No content. Empty string will be sent as response and cannot be parsed as json
          return {}
        } else {
          return response.json().then((responseObject) => {
            return camelizeObject(responseObject)
          })
        }
      } else {
        // response headers does not have a content type set or does not have value = 'application/json'
        try {
          return response.json().then((responseObject) => {
            return camelizeObject(responseObject)
          })
        } catch (e) {
          // Handle such errors
          console.log(e)
        }
      }
    } else {
      if (status === 403) {
        // Handle Forbidden response
      }
      if (status === 401) {
        // Handle logout scenarios
      }
      const responsePromise =
        response.headers.get('Content-Type') === 'application/json'
          ? response.json()
          : response.text()
      return responsePromise.then((payload) => {
        payload.status = status
        return Promise.reject(payload)
      })
    }
  }
}

const get = (url, data = {}) => {
  if (data && !isObjectEmpty(data)) {
    url = `${url}?${getQueryString(underscoreObject(data))}`
  }
  return sendRequest(url, 'get', null)
}

const put = (url, data) => {
  return sendRequest(url, 'put', data)
}

const post = (url, data) => {
  return sendRequest(url, 'post', data)
}

const patch = (url, data) => {
  return sendRequest(url, 'PATCH', data)
}

const _delete = (url, data) => {
  return sendRequest(url, 'delete', data)
}

const requestService = {
  get,
  post,
  put,
  patch,
  _delete,
}

export default requestService
