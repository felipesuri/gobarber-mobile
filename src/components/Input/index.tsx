import React from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styled'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <S.InputWrapper>
    <S.Icon name={icon} size={20} color="#666360" />

    <S.TextInput placeholderTextColor="#666360" {...rest} />
  </S.InputWrapper>
)

export default Input
