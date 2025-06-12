import { StyleSheet, Text, View } from 'react-native'
import React  from 'react'
import { useRouter } from "expo-router"
export default function NotFound() {
  const router = useRouter()
  React.useEffect(()=>{
    setTimeout(
      ()=>router.replace("/")
    ),
    10000
  },)
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text>Sorry we could not Find this Route</Text>
    </View>
  )
}

const styles = StyleSheet.create({})