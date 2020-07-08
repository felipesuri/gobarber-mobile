import React, { useEffect, useRef } from 'react'
import { TextInputProps } from 'react-native'

import { useField } from '@unform/core'

import * as S from './styled'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputValueReference {
  value: string
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [fieldName, registerField])

  return (
    <S.InputWrapper>
      <S.Icon name={icon} size={20} color="#666360" />

      <S.TextInput
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </S.InputWrapper>
  )
}

export default Input
