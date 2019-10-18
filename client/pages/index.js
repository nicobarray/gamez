import React from 'react'
import Link from 'next/link'
import styled, { createGlobalStyle } from 'styled-components'
import useForm from 'react-hook-form'
import { Baseline, VSpace } from '@ambler/andive'

import { Lobby } from '../components/lobby'
import { CreateGameForm } from '../components/create-game-form'
import { AppContainer, AppRow, AppCol } from '../components/responsive'

const Header = styled.div`
  padding: 8px 8px 16px 8px;
  height: 64px;
  font-size: 32px;
`

const Home = () => {
  return (
    <Baseline>
      <Header>Gamez</Header>

      <AppContainer>
        <AppRow>
          <AppCol>
            <Lobby />
          </AppCol>
        </AppRow>

        <VSpace px={16} />

        <AppRow>
          <AppCol>
            <CreateGameForm />
          </AppCol>
        </AppRow>
      </AppContainer>
    </Baseline>
  )
}

export default Home
