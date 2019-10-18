import React from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'

const endpoint = 'http://91.121.165.129:12345'

export function useGames() {
  const { loading, error, result, execute } = useAsync(async () => (await fetch(endpoint + '/games')).json(), [])
  return { loading, error, data: result, refetch: execute }
}

export async function createGame(name) {
  return (await fetch(endpoint + '/games', { method: 'POST', body: JSON.stringify({ name }) })).json()
}
