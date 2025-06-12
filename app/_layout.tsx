import { TamaguiProvider } from "tamagui";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import config from "@/tamagui.config";
import { View , Text , Platform , Pressable} from "react-native";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import React from "react";
import { router } from "expo-router"
// Always import the global css
import "@/global.css"

// This is for the icon for fav and home
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';


// FOR THE CONTEXT API DATA SHEARING
import  DataProvider  from "@/util/apiFetch";
// FOR THE INPUT FROM THE SEARCH SECTION
import Inpss from "@/util/Inps";
// FOR THE FAV ARRAY WHERE IT CAN ADDED AND RETRIVED FROM
import Favarray from "@/util/favArr";

// FOR ERROR POP UP WHICH IS TOAST
import Toast from "react-native-toast-message";
import { NotifierRoot } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// This is for the [id] to get the name
import { useLocalSearchParams } from 'expo-router'
export default function Layout(){

    const { id } = useLocalSearchParams()

  // use Ref for the gesture toast
  const notifierRef = React.useRef<NotifierRoot>(null);
  const HeaderRight = () =>{
    return(
      <View style={{paddingHorizontal:-20}}>
        <View className="flex-col">
          <Pressable onPress={()=>router.push("/screens/search")}>
            <AntDesign name="search1" size={28} color="black" />
          </Pressable>
          
          <Pressable onPress={()=>router.push("/screens/fav")}>
            <Fontisto name="favorite" size={28} color="black" />
          </Pressable>
        </View>
      </View>
    )
  }

  const SearchRight = ()=>{
    return(
      <>
        <View>
            <Pressable onPress={()=> router.back()}>
              <Entypo name="home" size={28} color="black" />
            </Pressable>
        </View>
      </>
    )
  }

  useEffect(() => {
   async function navBar(){
      if (Platform.OS === 'android') {
      // Set the navigation bar style
      const color = await NavigationBar.setBackgroundColorAsync("lightblue")
      }
    }
    navBar()
  }, []);
return (
  <>
  <StatusBar barStyle={'dark-content'} backgroundColor={'#93c5fd'}/>
      <TamaguiProvider config={config}>
        <GestureHandlerRootView>
          <DataProvider>
            <Inpss>
              <Favarray>
                      <Stack 
                        screenOptions={
                          {
                            headerShadowVisible:false,
                            headerTransparent:false,
                            // statusBarStyle : "#93c5fd"
                            headerStyle:{
                              backgroundColor:"#93c5fd"
                            },
                          }
                        }
                      >
                          <Stack.Screen name="index" options={
                            {
                              title:"N/A",
                              headerRight:()=>HeaderRight()
                            }
                          }/>
                          <Stack.Screen name="+not-found"/>

                          <Stack.Screen name="Forcast"
                          options={
                            {
                              title:"forcast",
                              presentation: "formSheet",
                              gestureDirection: "vertical",
                              animation : 'slide_from_bottom',
                              sheetGrabberVisible : true,
                              sheetInitialDetentIndex: 0,
                              sheetAllowedDetents : [0.5,0.75,1],
                              sheetCornerRadius:20,
                              sheetElevation:24,
                              sheetExpandsWhenScrolledToEdge:true
                            }
                          }/>

                          <Stack.Screen 
                            name="screens/search"
                            options={
                              {
                                title:"Search City",
                                headerRight :()=>SearchRight()
                              }
                            }
                          />

                          <Stack.Screen 
                            name="screens/fav"
                            options={
                              {
                                title:"Favourite City"
                              }
                            }
                          />

                          <Stack.Screen 
                            name="screens/[id]"
                            options={
                              {
                                // headerShown: false
                                headerTitle: "location"
                              }
                            }
                          />
                    </Stack>
                    <NotifierRoot ref={notifierRef} />
                <Toast />
              </Favarray>
            </Inpss>
          </DataProvider>
        </GestureHandlerRootView>
      </TamaguiProvider>
  </>
  );
}