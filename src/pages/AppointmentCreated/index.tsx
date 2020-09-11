import React, { useMemo } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import * as S from './styled'

interface RouteParams {
  date: number
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation()
  const { params } = useRoute()

  const { date } = params as RouteParams

  const formattedDate = useMemo(() => {
    return format(date, "EEEE, 'dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'", {
      locale: ptBR,
    })
  }, [date])

  function handleButtonPress() {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    })
  }

  return (
    <S.AppointmentCreatedWrapper>
      <Icon name="check" size={80} color="#04d361" />

      <S.Title>Agendamento concluído</S.Title>
      <S.Description>{formattedDate}</S.Description>

      <S.Button onPress={handleButtonPress}>
        <S.ButtonText>Ok</S.ButtonText>
      </S.Button>
    </S.AppointmentCreatedWrapper>
  )
}

export default AppointmentCreated
