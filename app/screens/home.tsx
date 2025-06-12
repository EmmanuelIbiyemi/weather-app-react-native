import { View, Text , Pressable} from 'react-native'
import { router } from "expo-router";
import { Button, XStack} from "tamagui";
import { BlurView } from 'expo-blur';
import React from "react";
// This is for the Toast Section if their is error 
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { PassContext } from '@/util/apiFetch';
export default function Home() {

    const [shw , setShw] = React.useState(false);
    const { shwFore , setFore} = PassContext();

    const foreroute =()=>{
      if (shwFore === true){
        router.push('/Forcast')
      }
      else{
        return(
              Notifier.showNotification({
                  title: 'The request was failed',
                  description: 'Check your internet connection, please',
                  Component: NotifierComponents.Alert,
                  componentProps: {
                      alertType: 'error',
                  },
              })
            )
      }
    }
  return (
    <View className="flex-1 justify-center items-center bg-blue-300">
      <BlurView intensity={80} tint='prominent' className='w-[350px] border  justify-ceenter items-center rounded-2xl'>
        <View className="items-center justify-center h-[400px] w-9/12 border-red-600">
        
        {/* COLUMNN OR THE NAMES */}
          <XStack gap={135}>
            <Text className="text-2xl font-bold">
              Location
            </Text> 
            <Text className="text-2xl font-bold">
              N/A *F
            </Text> 
          </XStack>
          
          <View className="bg-yellow-500 w-[200px] h-[200px] rounded-full items-center justify-center ">
            <Text className='font-bold'>
              N/A Sorry not available
            </Text>
          </View>
          <Text className="text-2xl font-bold">
              N/A
          </Text>
          <View className="flex-row gap-x-20">
            <Text className="font-bold text-xl">
              N\A
            </Text>
            <Text className="font-bold text-xl">
              N\A
            </Text>
            <Text className="font-bold text-xl">
              N\A
            </Text>
          </View>
        </View>
      </BlurView>

           {/* BUTTON FOR FUTURE FORECAST */}
      <BlurView intensity={80} tint='prominent' className='border-white position: absolute bottom-10 items-center border rounded-md'>
        <Pressable className=" w-[300px] h-[45px] rounded-md justify-center items-center font-semibold" onPress={()=>foreroute()}>
          <Text className='font-semibold color-black'>
            Future Forecast
          </Text>
        </Pressable>
      </BlurView>
    </View>
  )
}