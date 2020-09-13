import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const SignUpWrapper = styled.View`
  flex: 1;
  justify-content: center;

  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ebe8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0 24px;
  text-align: left;
`

export const ButtonsWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const Button = styled.TouchableOpacity`
  margin-top: 48px;
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`
