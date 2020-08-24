import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../hooks/auth'

import * as S from './styled'

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  function handleNavigateToProfile() {
    navigate('Profile')
    console.log(user.avatar_url)
  }

  return (
    <S.DashboardWrapper>
      <S.Header>
        <S.HeaderTitle>
          Bem,vindo {'\n'}
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
