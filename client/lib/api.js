import React from 'react'
import { useAsync, useAsyncCallback } from 'react-async-hook'
import { toastError } from '@ambler/andive'

// TODO: Use HTTPs
const endpoint = 'http://91.121.165.129:12345'

// Queries.

function useQuery(res, method = 'GET', body = undefined) {
  const { loading, error, result, execute } = useAsync(
    async () =>
      (await fetch(`${endpoint}${res}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined
      })).json(),
    []
  )

  console.log(`[query] on ${res} ${body ? ` with ${JSON.stringify(body)}` : ''} is ${loading ? 'loading' : 'fetched'}`)

  return { loading, error, data: result, refetch: execute }
}

export function useGames() {
  return useQuery('/games')
}

export function useGame(id) {
  return useQuery(`/games/${id}`, 'POST', { action: 'get_state' })
}

// Mutations.

async function mutation(res, action, otherFields = {}) {
  let response = null

  console.log(`[mutation] on ${res} with ${JSON.stringify({ action, ...otherFields })}`)

  try {
    response = await (await fetch(`${endpoint}${res}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...otherFields })
    })).json()

    if (!response.status || response.status === 'error') {
      throw new Error(response.reason)
    }
  } catch (err) {
    toastError(err && err.message)
  }

  return response
}

export async function createGame(name) {
  return mutation('/games', 'create_game', { name })
}

export async function joinGame(id) {
  return mutation('/games', 'join_game', { id })
}
