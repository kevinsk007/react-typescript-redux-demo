import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const origin = window.origin || window.location.origin

const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: headers,
  })
    .then(response => {
      console.log(response)

      return handleResponse(url, response)
    })
    .catch(error => {
      console.error(`Request failed. Url = ${url}. Message = ${error}`)
      return Promise.reject({ error: { message: 'Request failed.' } })
    })
}

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: data,
  })
    .then(response => {
      return handleResponse(url, response)
    })
    .catch(error => {
      console.error(`Request failed. Url = ${url}. Message = ${error}`)
      return Promise.reject({ error: { message: 'Request failed.' } })
    })
}

function handleResponse(url, response) {
  if (response.status === 200) {
    return response.json()
  } else {
    console.error(`Request failed. Url = ${url}`)
    return Promise.reject({ error: { message: 'Request failed due to server error' } })
  }
}

// function post(url: string, data?: any) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'post',
//       url: origin + url,
//       data,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         return resolve(response)
//       })
//       .then(res => {
//         return reject(res)
//       })
//   })
// }
// function get(url: string, params?: any) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'get',
//       url: origin + url,
//       params,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//     })
//       .then(response => {
//         return resolve(response)
//       })
//       .then(res => {
//         return reject(res)
//       })
//   })
// }

export { get, post }
