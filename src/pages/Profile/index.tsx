import React, { useRef, useCallback } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import * as Yup from 'yup'
import ImagePicker from 'react-native-image-picker'

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Input from '../../components/Input'
import Button from '../../components/Button'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import * as S from './styled'

interface ProfileFormData {
  name: string
  email: string
  password: string
  old_password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const { user, updateUser, signOut } = useAuth()

  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        })

        await schema.validate(data, { abortEarly: false })

        const { name, email, old_password, password, password_confirmation } = data

        const formData = Object.assign(
          {
            name,
            email,
          },
          old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}
        )

        const response = await api.put('/profile', formData)

        updateUser(response.data)

        navigation.goBack()

        Alert.alert('Perfil atualizado com sucesso')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        Alert.alert(
          'Erro na atualização do perfil',
          'Erro ao atualizar seu perfil, tente novamente'
        )
      }
    },
    [navigation, updateUser]
  )

  function handleNavigateGoBack() {
    navigation.goBack()
  }

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Seleciona um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galera',
      },
      response => {
        if (response.didCancel) {
          return
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar.')
          return
        }

        const data = new FormData()

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        })

        api.patch('/users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data)
        })
      }
    )
  }, [updateUser, user.id])

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <S.SignUpWrapper>
            <S.ButtonsWrapper>
              <S.Button onPress={handleNavigateGoBack}>
                <Icon name="chevron-left" size={24} color="#999591" />
              </S.Button>

              <S.Button onPress={signOut}>
                <Icon name="power" size={24} color="#999591" />
              </S.Button>
            </S.ButtonsWrapper>

            <S.UserAvatarButton onPress={handleUpdateAvatar}>
              <S.UserAvatar source={{ uri: user.avatar_url }} />
            </S.UserAvatarButton>

            <S.Title>Meu perfil</S.Title>

            <Form
              initialData={user}
              ref={formRef}
              style={{ width: '100%' }}
              onSubmit={handleSubmit}
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
                  oldPasswordInputRef.current?.focus()
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </S.SignUpWrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
