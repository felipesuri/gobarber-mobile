import React from 'react'
import { Image } from 'react-native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styled'

const Login: React.FC = () => {
  return (
    <S.LoginWrapper>
      <Image source={logoImg} />

      <S.Title>Faça seu login</S.Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => console.log('ok')}>Entrar</Button>
    </S.LoginWrapper>
  )
}

export default Login
