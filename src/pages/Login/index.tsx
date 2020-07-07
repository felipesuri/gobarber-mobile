import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styled'

const Login: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.LoginWrapper>
            <Image source={logoImg} />

            <S.Title>Faça seu login</S.Title>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => console.log('ok')}>Entrar</Button>

            <S.ForgotPassword onPress={() => console.log('ok')}>
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.LoginWrapper>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccountButton onPress={() => console.log('ok')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountButtonText>Criar uma conta</S.CreateAccountButtonText>
      </S.CreateAccountButton>
    </>
  )
}

export default Login
