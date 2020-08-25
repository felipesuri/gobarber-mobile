import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import { Provider } from '../Dashboard'

import * as S from './styled'

interface RouteParams {
  providerId: string
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)

  const { user } = useAuth()
  const { goBack } = useNavigation()

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data))
  }, [])

  function handleNavigateBack() {
    goBack()
  }

  function handleSelectProvider(providerId: string) {
    setSelectedProvider(providerId)
  }

  return (
    <S.CreateAppointmentWrapper>
      <S.Header>
        <Icon
          onPress={handleNavigateBack}
          name="chevron-left"
          size={24}
          color="#999591"
        />

        <S.HeaderTitle>Cabeleireiros</S.HeaderTitle>

        <S.UserAvatar source={{ uri: user.avatar_url }} />
      </S.Header>

      <S.ProvidersListContainer>
        <S.ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <S.ProviderContainer
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <S.ProviderAvatar source={{ uri: provider.avatar_url }} />
              <S.ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </S.ProviderName>
            </S.ProviderContainer>
          )}
        />
      </S.ProvidersListContainer>
    </S.CreateAppointmentWrapper>
  )
}

export default CreateAppointment
