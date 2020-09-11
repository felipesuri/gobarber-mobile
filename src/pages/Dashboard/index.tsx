import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import * as S from './styled'

export interface Provider {
  id: string
  name: string
  avatar_url: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([])

  const { user } = useAuth()
  const { navigate } = useNavigation()

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data))
  }, [])

  function handleNavigateToCreateAppointment(providerId: string) {
    navigate('CreateAppointment', { providerId })
  }

  function handleNavigateToProfile() {
    navigate('Profile')
  }

  return (
    <S.DashboardWrapper>
      <S.Header>
        <S.HeaderTitle>
          Bem-vindo{'\n'}
          <S.UserName>{user.name}</S.UserName>
        </S.HeaderTitle>

        <S.ProfileButton onPress={handleNavigateToProfile}>
          <S.UserAvatar source={{ uri: user.avatar_url }} />
        </S.ProfileButton>
      </S.Header>

      <S.ProvidersList
        data={providers}
        ListHeaderComponent={<S.ProviderListTitle>Cabeleireiros</S.ProviderListTitle>}
        keyExtractor={provider => provider.id}
        renderItem={({ item: provider }) => (
          <S.ProviderContainer
            onPress={() => handleNavigateToCreateAppointment(provider.id)}
          >
            <S.ProviderAvatar source={{ uri: provider.avatar_url }} />

            <S.ProviderInfo>
              <S.ProviderName>{provider.name}</S.ProviderName>

              <S.ProviderMeta>
                <Icon name="calendar" size={16} color="#ff9000" />
                <S.ProviderMetaText>Segunda á sexta</S.ProviderMetaText>
              </S.ProviderMeta>

              <S.ProviderMeta>
                <Icon name="clock" size={16} color="#ff9000" />
                <S.ProviderMetaText>8hrs ás 17hrs</S.ProviderMetaText>
              </S.ProviderMeta>
            </S.ProviderInfo>
          </S.ProviderContainer>
        )}
      />
    </S.DashboardWrapper>
  )
}

export default Dashboard
