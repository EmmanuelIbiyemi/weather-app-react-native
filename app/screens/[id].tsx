import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'


// This is the component for the user to see it
import Home from './home'
export default function Countryweather() {
    const { id } = useLocalSearchParams()

  return (
    <View className='flex flex-1 bg-white '>
      <Home />
    </View>
  )
}

