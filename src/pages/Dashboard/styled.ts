import styled from 'styled-components/native'
import { FlatList } from 'react-native'

import { Providers } from './index'

export const DashboardWrapper = styled.View`
  flex: 1;
`

export const Header = styled.View`
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const HeaderTitle = styled.Text`
  color: #faede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
`

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Providers>)``
