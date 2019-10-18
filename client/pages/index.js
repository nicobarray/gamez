import React from 'react'
import Link from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import useForm from 'react-hook-form'
import { Title, AppBar, Baseline, VSpace } from '@ambler/andive'

import { Lobby } from '../components/lobby'
import { LobbyForm } from '../components/lobby-form'
import { AppContainer, AppRow, AppCol } from '../components/responsive'
import { useGames } from '../lib/api'

const Home = () => {
  const { data, loading, error, refetch } = useGames()

  return (
    <Baseline>
      <AppBar height={64}>
        <Title title="Gamez" />
      </AppBar>

      <VSpace px={16} />

      <AppContainer>
        <AppRow>
          <AppCol>
            <LobbyForm refetchLobby={refetch} />
          </AppCol>
        </AppRow>

        <VSpace px={16} />

        <Lobby data={data} error={error} loading={loading} />
      </AppContainer>
    </Baseline>
  )
}

export default Home
