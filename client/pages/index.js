import React from 'react'
import Link from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import useForm from 'react-hook-form'
import { Title, AppBar, VSpace, Button, toastSuccess } from '@ambler/andive'

import { Lobby } from '../components/lobby'
import { LobbyForm } from '../components/lobby-form'
import { AppContainer, AppRow, AppCol } from '../components/responsive'
import { useGames } from '../lib/api'
import { Game } from '../components/game'
import { useRouter } from 'next/router'

const Home = () => {
  const gamesQuery = useGames()
  const router = useRouter()
  const id = router.query.gid

  return (
    <>
      <AppBar height={64}>
        <Title title="Gamez" />
      </AppBar>

      <VSpace px={16} />

      <AppContainer>
        <AppRow>
          <AppCol>
            <LobbyForm refetchLobby={gamesQuery.refetch} />
          </AppCol>
        </AppRow>

        <VSpace px={16} />

        <Lobby {...gamesQuery} />
      </AppContainer>
    </>
  )
}

export default Home
