import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const SignUpWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ebe8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 2px;
  border-color: #232129;
  padding: 16px 0 16px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`
