import React from 'react'
import { useAsync } from 'react-async-hook'

const endpoint = 'http://91.121.165.129:12345'

export function useGames() {
  const { loading, error, result, ...other } = useAsync(async () => (await fetch(endpoint + '/games')).json(), [])

  console.log(loading, error, result, other)
  return { loading, error, data: result }
}
