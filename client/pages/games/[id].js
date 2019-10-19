import React from 'react'
import Link from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import useForm from 'react-hook-form'
import { Title, AppBar, VSpace, Button, toastSuccess, BackIcon } from '@ambler/andive'

import { Lobby } from '../../components/lobby'
import { LobbyForm } from '../../components/lobby-form'
import { AppContainer, AppRow, AppCol } from '../../components/responsive'
import { useGames } from '../../lib/api'
import { Game } from '../../components/game'
import { useRouter } from 'next/router'

const AppBarLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  height: 64px;
  padding-left: 16px;
`

const Page = () => {
  const router = useRouter()
  const id = router.query.id

  return (
    <>
      <AppBar height={64}>
        <AppContainer>
          <AppRow>
            <AppBarLayout>
              <BackIcon onClick={router.back} style={{ cursor: 'pointer' }} />
            </AppBarLayout>
          </AppRow>
        </AppContainer>
      </AppBar>

      <AppContainer>
        <VSpace px={16} />

        <AppRow>
          <AppCol>{id ? <Game id={id} /> : <div>Wait...</div>}</AppCol>
        </AppRow>

        <VSpace px={16} />
      </AppContainer>
    </>
  )
}

export default Page
