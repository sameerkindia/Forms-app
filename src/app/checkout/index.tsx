import { View, Text } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

const index = () => {
  return (
    <Redirect href="/checkout/personal" />
  )
}

export default index