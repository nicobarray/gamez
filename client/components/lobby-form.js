import React from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'
import { Button, Typography, Info } from '@ambler/andive'

import { Input } from './andive'
import { AppContainer, AppRow, AppCol } from './responsive'
import { createGame } from '../lib/api'

const Form = styled.form`
  border: 1px solid white;
  padding: 16px;
`

const Error = styled.div`
  position: absolute;
  left: 17px;
  bottom: -40px;
`

export function LobbyForm({ refetchLobby }) {
  const { register, handleSubmit, errors, clearError, reset } = useForm()
  const [name, setName] = React.useState('')

  const onCreateGame = async values => {
    const res = await createGame(values.name)
    refetchLobby()
    clearError()
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(onCreateGame)}>
      <AppRow align="center">
        <AppCol xs={12} md={8}>
          <Input
            name="name"
            placeholder="Name of the game"
            ref={register({
              required: 'Game name is required',
              maxLength: { value: 16, message: 'The name must be between 3 and 16 chars' },
              minLength: { value: 3, message: 'The name must be between 3 and 16 chars' }
            })}
          />
          {errors.name ? (
            <Error>
              <Info>
                <Typography.Body2 color="red">{errors.name.message}</Typography.Body2>
              </Info>
            </Error>
          ) : null}
        </AppCol>
        <AppCol xs={12} md={4}>
          <Button type="submit" label="Create" mobile />
        </AppCol>
      </AppRow>
    </Form>
  )
}
