import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import * as S from './styled'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()

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
    </S.DashboardWrapper>
  )
}

export default Dashboard
