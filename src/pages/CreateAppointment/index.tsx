import React, { useEffect, useState, useMemo } from 'react'
import { Platform, Alert } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

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
  const [selectedHour, setSelectedHour] = useState(0)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  const { user } = useAuth()
  const { goBack, navigate } = useNavigation()

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

    setSelectedHour(0)
  }

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  function handleSelectHour(hour: number) {
    setSelectedHour(hour)
  }

  async function handleCreateAppointment() {
    try {
      const date = new Date(selectedDate)

      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      })

      navigate('AppointmentCreated', { date: date.getTime() })
    } catch {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar um agendamento, tente novamente'
      )
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

      <S.Content>
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

        <S.Schedule>
          <S.Title>Escolha o horário</S.Title>

          <S.Section>
            <S.SectionTitle>Manhã</S.SectionTitle>

            <S.SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <S.Hour
                  enabled={available}
                  available={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour)}
                  key={hourFormatted}
                >
                  <S.HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </S.HourText>
                </S.Hour>
              ))}
            </S.SectionContent>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tarde</S.SectionTitle>
            <S.SectionContent>
              {afternoonAvailability.map(({ hourFormatted, available, hour }) => (
                <S.Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  onPress={() => handleSelectHour(hour)}
                  key={hourFormatted}
                >
                  <S.HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </S.HourText>
                </S.Hour>
              ))}
            </S.SectionContent>
          </S.Section>
        </S.Schedule>

        <S.CreateAppointmentButton onPress={handleCreateAppointment}>
          <S.CreateAppointmentButtonText>Agendar</S.CreateAppointmentButtonText>
        </S.CreateAppointmentButton>
      </S.Content>
    </S.CreateAppointmentWrapper>
  )
}

export default CreateAppointment
