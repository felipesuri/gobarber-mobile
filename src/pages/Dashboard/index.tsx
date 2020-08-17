import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import * as S from './styled'

export interface Providers {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Providers[]>([])

  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data)
    })
  }, [])

  function handleNavigateToProfile() {
    navigate('Profile')
  }

  return (
    <S.DashboardWrapper>
      <S.Header>
        <S.HeaderTitle>
          Bem-vindo,
          {'\n'}
          <S.UserName>{user.name}</S.UserName>
        </S.HeaderTitle>

        <S.ProfileButton onPress={handleNavigateToProfile}>
          <S.UserAvatar source={{ uri: user.avatar_url }} />
        </S.ProfileButton>
      </S.Header>

      <S.ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({ item }) => <S.UserName>{item.name}</S.UserName>}
      />
    </S.DashboardWrapper>
  )
}

export default Dashboard
