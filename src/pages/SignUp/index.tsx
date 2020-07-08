import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png'

import * as S from './styled'

const SingUp: React.FC = () => {
  const navigation = useNavigation()

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

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => console.log('ok')}>Entrar</Button>
          </S.SignUpWrapper>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.BackButton onPress={() => console.log('ok')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <S.BackButtonText>Voltar para Login</S.BackButtonText>
      </S.BackButton>
    </>
  )
}

export default SingUp
