export const API = async (endpoint: string, params?: any) => {
  return fetch(endpoint, { ...params })
    .then((res) => res.json())
    .then((data) => data)
    .catch(console.error)
}
