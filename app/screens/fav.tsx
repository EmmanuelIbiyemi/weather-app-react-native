import { View , Text , FlatList , Pressable} from "react-native";
import React, { useEffect } from "react";
import { PassContext } from "@/util/apiFetch"
import { FavRun } from "@/util/favArr";
import { Button } from "tamagui";


import { Notifier, NotifierComponents } from 'react-native-notifier';
export default function Fav(){

     // This the function for the toast for Error Message
        const Errmessage =()=>{
            // Toast.show({
            //     type:'error',
            //     text1: 'Network',
            //     text1Style:[{
            //         fontSize:17,
            //         fontWeight:'bold',
            //     }],
            //     text2: 'There is NetWork Issue',
            //     text2Style:[{
            //         fontSize:17,
            //         fontWeight:'bold',
            //     }]
            // });
            Notifier.showNotification({
                title: 'The request was failed',
                description: 'Check your internet connection, please',
                Component: NotifierComponents.Alert,
                componentProps: {
                    alertType: 'error',
                },
            });
    
        }
    type item = any ;

    // Varible for the FavArr 
    const { favarr  } = FavRun();

    const renderItems = ({ item }:{item: item}) =>{
        return(
            <View className="flex flex-1 bg-fuchsia-400 border-1  gap-30">
                <Pressable>
                    <View className="border-1 border rounded-xl" style={{padding:20}}>
                    <Text>
                        {item.country}
                    </Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    useEffect(()=>{
        console.log(favarr)
    })


    const FetchingData = ()=>{
        return(
            <View>
                <FlatList 
                    data = { favarr }
                    renderItem={({ item }) => renderItems({ item })} 
                    keyExtractor={(item: item , index: number)=> index.toString()}
                />
            </View>
        )
        

    }
    return(
        <View className="flex-1 p-20px bg-blue-300">
            <Text className="font-bold size-20">
               This is the array: 
            </Text>
            <Button onPress={()=>Errmessage()}>
                Click me
            </Button>

            {/* <FetchingData /> */}
        </View>
    )
}

