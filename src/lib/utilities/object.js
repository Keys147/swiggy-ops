export const toCamelCase = (str) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '')
  })
}

export const toUnderscoreCase = (str) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export const isObject = (obj) => {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

export const camelizeObject = (obj) => {
  if (isObject(obj)) {
    const n = {}

    Object.keys(obj).forEach((k) => {
      n[toCamelCase(k)] = camelizeObject(obj[k])
    })

    return n
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return camelizeObject(i)
    })
  }

  return obj
}

export const underscoreObject = (obj) => {
  if (isObject(obj)) {
    const n = {}

    Object.keys(obj).forEach((k) => {
      n[toUnderscoreCase(k)] = underscoreObject(obj[k])
    })

    return n
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return underscoreObject(i)
    })
  }

  return obj
}

export const isOffline = (status) => {
  return status === 0
}

export const isUnauthorized = (status) => {
  return status === 401
}

export const isInvalid = (status) => {
  return status === 400 || status === 422
}

export const isSuccess = (status) => {
  return status >= 200 && status < 300
}

export const getKeysFromObject = (object) => {
  const keys = Object.keys(object)
  const index = keys.indexOf('toString')
  if (index > -1) {
    keys.splice(index, 1)
  }
  return keys
}

export const getQueryString = (data) => {
  if (data) {
    let queryString
    const keys = getKeysFromObject(data)
    const queryStringArray = []
    keys.forEach((key) => {
      let value = data[key]
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      queryStringArray.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
    })
    queryString = queryStringArray.join('&')
    return queryString
  }
}

export const isObjectEmpty = (obj) => {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}
