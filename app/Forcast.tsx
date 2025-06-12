import {  Text, View , FlatList , Pressable ,Alert } from 'react-native'
import React from 'react'
import { Animated } from 'react-native';
import { PassContext } from '@/util/apiFetch';


// FOR THE ICON UP FOR THE TOP UP BUTTON
import Feather from '@expo/vector-icons/Feather';
export default function Modalin() {

  // Scrolling To Top
  const scrolling = React.useRef<FlatList>(null)

   type item = any ;
     const { varing , weatherData } = PassContext();


     const scrollTop =()=>{
      return(
        scrolling.current?.scrollToOffset({ offset: 0 , animated:true})
      )
     }

    

     //    The Data days that should be mapped to get the values
         const datai = weatherData.days;
     
         const renderItems = ({ item }:{item: item}) =>{
             return(
                 <View className="flex flex-1 bg-white border-1">
                     <View className="border-1 border rounded-xl h-20 flex-row" style={{padding:20, gap:10, margin:5}}>
                         <Text>
                         {/* Date : {item.datetime} */}
                          {item.datetime}
                          {item.preciptype}
                         Temperature {item.temp}
                         Pressure {item.pressure}
                      </Text>
                     </View>
                 </View>
             )
         }
          const FetchingData = ()=>{
                 return(
                     <View className='bg-white'>
                         <FlatList 
                          ref={scrolling}
                          data = {datai}
                          renderItem={({ item }) => renderItems({ item })} 
                          showsVerticalScrollIndicator={false}
                         />
                     </View>
                 )
             }

  return (
    <View className='flex flex-1 justify-center items-center pt-10 bg-white'>
      
      <FetchingData />

        {/* THIS IS FOR THE TOP UP BUTTON ON IT  */}
        <Pressable onPress={()=>{scrollTop}}>
          <View  className='bg-blue-300 w-[70px] h-20 justify-center items-center rounded-full position: absolute bottom-10 ;' style={{left:75}}>
              <Feather name="chevron-up" size={24} color="black" />
          </View>
      </Pressable>
</View>
  )
}



//  <Text>
//         This is the Weather ForeCast Section
//       </Text>
//       <Button onPress={()=>router.push('/screens/search')}>
//         Checking
//       </Button>