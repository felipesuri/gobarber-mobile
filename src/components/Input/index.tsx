import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react'
import { TextInputProps } from 'react-native'

import { useField } from '@unform/core'

import * as S from './styled'
import { TabRouter } from '@react-navigation/native'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsField(!!inputValueRef.current.value)
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))

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
    <S.InputWrapper isFocused={isFocused} isErrored={!!error}>
      <S.Icon
        name={icon}
        size={20}
        color={isFocused || isField ? '#ff9000' : '#666360'}
      />

      <S.TextInput
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </S.InputWrapper>
  )
}

export default forwardRef(Input)
