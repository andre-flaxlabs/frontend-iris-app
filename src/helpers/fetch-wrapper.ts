// import { useAuth } from '@/stores/auth'

// export const fetchWrapper = {
//   get: request('GET'),
//   post: request('POST'),
//   put: request('PUT'),
//   delete: request('DELETE')
// }

// async function request(method: string) {
//   return (url, body, { credentials } = {}) => {
//     const requestOptions = {
//       method,
//       headers: authHeader(url)
//     }
//     if (body) {
//       requestOptions.headers['Content-Type'] = 'application/json'
//       requestOptions.body = JSON.stringify(body)
//     }
//     if (credentials) {
//       requestOptions.credentials = credentials
//     }
//     return fetch(url, requestOptions).then(handleResponse)
//   }
// }

// function authHeader(url) {
//   const auth = useAuth()
//   const isLoggedIn = auth.accessToken
//   const isApiUrl = url.startsWith(import.meta.env.VITE_APP_BASE_URL)
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${auth.accessToken}` }
//   } else {
//     return {}
//   }
// }

// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text)

//     if (!response.ok) {
//       const { accessToken, logout } = useAuth()
//       if ([401, 403].includes(response.status) && accessToken) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         logout()
//       }

//       const error = (data && data.message) || response.statusText
//       return Promise.reject(error)
//     }

//     return data
//   })
// }
