import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import { Provider } from '../Dashboard'

import * as S from './styled'

interface RouteParams {
  providerId: string
}

interface AvailabilityItem {
  hour: number
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams

  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  const { user } = useAuth()
  const { goBack } = useNavigation()

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data))
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => setAvailability(response.data))
  }, [selectedDate, selectedProvider])

  function handleNavigateBack() {
    goBack()
  }

  function handleSelectProvider(providerId: string) {
    setSelectedProvider(providerId)
  }

  function handleToggleDatePicker() {
    setShowDatePicker(state => !state)
  }

  function handleDateChanged(event: any, date: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false)
    }

    if (date) {
      setSelectedDate(date)
    }
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

      <S.Calendar>
        <S.Title>Escolha a data</S.Title>

        <S.OpenDatePickerButton onPress={handleToggleDatePicker}>
          <S.OpenDatePickerButtonText>Selecionar outra data</S.OpenDatePickerButtonText>
        </S.OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            is24Hour
            display="calendar"
            onChange={handleDateChanged}
            value={selectedDate}
          />
        )}
      </S.Calendar>
    </S.CreateAppointmentWrapper>
  )
}

export default CreateAppointment
