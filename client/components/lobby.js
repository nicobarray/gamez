import React from 'react'
import styled from 'styled-components'
import { Info, PatientIcon, VSpace, Button } from '@ambler/andive'

import { AppContainer, AppRow, AppCol } from './responsive'

const GameRow = styled(AppRow)`
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 6px;
  margin-bottom: 8px;
  background: white;
`

export function Lobby({ data, loading, error }) {
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

  return (
    <>
      <Info icon={<PatientIcon circle />} iconSize={32}>
        <Info.Label label={['Lobby', `${games.filter(game => game.status !== 'finished').length} games`].join(' - ')} />
      </Info>

      <VSpace px={8} />

      {games.map(game => (
        <GameRow key={game.id} align="center">
          <AppCol xs={12} md={4}>
            <Info>
              <Info.Item item="Name" />
              <Info.Label label={game.name} />
            </Info>
          </AppCol>
          <AppCol xs={12} md={4}>
            <Info>
              <Info.Item item="Status" />
              <Info.Label label={game.status} />
            </Info>
          </AppCol>
          <AppCol xs={12} md={2}>
            <Info>
              <Info.Item item="Players" />
              <Info.Label label={game.status === 'pending' ? '1/2' : game.status === 'running' ? '2/2' : '0'} />
            </Info>
          </AppCol>
          <AppCol xs={12} md={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {game.status === 'pending' ? (
              <Button label="Join" variant="primary" mobile small />
            ) : game.status === 'running' ? (
              <Button label="Watch" mobile small />
            ) : null}
          </AppCol>
        </GameRow>
      ))}
    </>
  )
}
