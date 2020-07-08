import React, { useRef } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styled'

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

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
          <S.SignUpWrapper>
            <Image source={logoImg} />

            <S.Title>Crie sua conta</S.Title>

            <Form
              ref={formRef}
              style={{ width: '100%' }}
              onSubmit={(data: object) => {
                console.log(data)
              }}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus()
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
            </Form>
          </S.SignUpWrapper>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.BackButton onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <S.BackButtonText>Voltar para Login</S.BackButtonText>
      </S.BackButton>
    </>
  )
}

export default SingUp
