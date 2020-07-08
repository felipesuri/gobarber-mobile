import React, { useCallback, useRef } from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styled'

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const handleSignIn = useCallback((data: object) => {
    console.log(data)
  }, [])

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

            <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current?.submitForm()
                }}
              >
                Entrar
              </Button>
            </Form>

            <S.ForgotPassword onPress={() => console.log('ok')}>
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.LoginWrapper>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountButtonText>Criar uma conta</S.CreateAccountButtonText>
      </S.CreateAccountButton>
    </>
  )
}

export default Login
