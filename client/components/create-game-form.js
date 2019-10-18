import React from 'react'
import useForm from 'react-hook-form'
import styled from 'styled-components'

import { AppContainer, AppRow, AppCol } from './responsive'

const Form = styled.form`
  border: 1px solid white;
  padding: 16px;
`

export function CreateGameForm() {
  const { register, handleSubmit, errors } = useForm()
  const [name, setName] = React.useState('')

  const onCreateGame = values => {
    console.log(values)
  }

  return (
    <Form onSubmit={handleSubmit(onCreateGame)}>
      <AppRow>
        <AppCol>
          <input
            name="name"
            placeholder="Name of the game"
            ref={register({
              required: 'Game name is required',
              maxLength: { value: 16, message: 'The name must be between 3 and 16 chars' },
              minLength: { value: 3, message: 'The name must be between 3 and 16 chars' }
            })}
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </AppCol>
      </AppRow>
      <AppRow>
        <AppCol>
          <button type="submit">Create & Join</button>
        </AppCol>
      </AppRow>
    </Form>
  )
}
