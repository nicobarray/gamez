import React from 'react'
import styled from 'styled-components'

import { AppContainer, AppRow, AppCol } from './responsive'
import { useGames } from '../lib/api'

const LobbyRoot = styled.div`
  padding-bottom: 32px;
`

const GameRow = styled(AppRow)`
  border: 1px solid white;
  border-radius: 6px;
  padding: 6px;
`

export function Lobby() {
  const { data, loading, error } = useGames()

  if (loading) {
    return <GameRow>Loading ...</GameRow>
  }

  if (error) {
    return (
      <GameRow>
        Error: <pre>{JSON.stringify(error, null, 2)}</pre>
      </GameRow>
    )
  }

  if (!data) {
    return (
      <GameRow>
        <i>"Tapus does not know how to compile" -- Someone</i>
      </GameRow>
    )
  }

  const { games } = data

  return games.map(game => {
    return (
      <GameRow key={game.id}>
        <AppCol xs={12} md={4}>
          {game.name}
        </AppCol>
        <AppCol xs={12} md={8}>
          {game.status}
        </AppCol>
      </GameRow>
    )
  })
}
