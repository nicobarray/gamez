import styled from 'styled-components'
import { Typography, palette } from '@ambler/andive'

export const Input = styled.input`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${palette.darkGrey};
  background: ${palette.darkGrey};

  outline: none;
  width: 100%;

  :hover,
  :focus {
    background: white;
    border-color: ${palette.darkPrimary};
    color: ${palette.darkPrimary};
  }

  ${Typography.body2Css};
`
