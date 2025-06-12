import { Alert, FlatList, Pressable, Text, View , } from 'react-native';
import React, { useState , useRef } from 'react';
import { BulletList } from 'react-content-loader';
import { Button , Input} from "tamagui";
// TO ROUTE Back to Home when CLICKED
import { router , Link } from "expo-router";

// THIS ARE THE INP FROM THE GLOBAL VARIBLE
import { PassinCon } from "@/util/Inps"
// THIS IS FOR THE FAV ARRAY TO USE IN SOME FUNTION
import { FavRun } from '@/util/favArr';

// Country names to filter from 
import countries from "@/util/countries.json"

// For the fav icon by the side
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// For notification if the user have put it in favourite already
import Toast from 'react-native-toast-message';

// Icon for the top icon
import Feather from '@expo/vector-icons/Feather';

export default function Search() {

  type items = any;

  // To be able to scroll to Top when ever the user scrolls Down
  const scorllTop = useRef<FlatList>(null)

  // Varible for state Value
  const { inpdata , setInp }  = PassinCon();

  // Varible for the FavArr 
  const { favarr , setArr } = FavRun();

  // This is for the color in favourite
  const [color , setColor] = useState("black")

  // This is for the shimmer Effect
  // const MyBulletListLoader = () => <BulletList backgroundColor='#333' />


  // This is for trying to get the uniqueness of the country.json file
  var favadding : string;
  // This is the filtered data for the array country
  const filteredData = countries.filter(item => item.country.toLowerCase().includes(inpdata.toLowerCase()))
        // console.log(filteredData)

        const [arr , setArrr] = React.useState([])
        
  // For adding to Fav array and not having issue
  // Function to add a new item only if its id is not already in the array
    function addItem(newItem: { country: string } , index :{ index: number }): void {
        const exists = favarr.some((item: { country: string }) => item.country === newItem.country);

        if (!exists) {
             setArr([...favarr, newItem]);
            console.log("Item added:", newItem);
        } else {
            console.log("Item with this ID already exists.");
            Toast.show(
              {
                text1:"Country Added",
                text1Style: {
                  fontSize:18,
                  fontWeight:'bold'
                },
                text2: "Sorry this country added already",
                text2Style: {
                  fontSize:15,
                  fontWeight:'bold'
                },
                visibilityTime: 1000
              }
            )
        }
    }
   

  React.useEffect(()=>{
    function show(){
      console.log(inpdata)
      console.log(countries)
      console.log(countries.map((item)=>
      //  setDir({...dir , contriesss: item.country })
        item.country 
      ))
      console.log(favadding);
      console.log(arr);
    }
    show();
  })

  const renderItems = ({item} : {item : items}) =>{

    favadding = item.country;

    return(
        <View className=' max-w-full'>
          <Pressable  onPress={()=>Alert.alert("Do you want to see weather", item.country, 
            [
              {
                text: "Cancel",
                onPress:()=>console.log("Item canceled"),
                style : 'cancel'
              },
               {
                text: "Ok",
                onPress:()=>{console.log("ok Pressed"), router.push(`/screens/${item.country}`)},
                style : 'default'
              }
            ],
            {
              cancelable : true
            }
          )}>
            <View 
            className='flex flex-row items-center gap-10 p-30  border-b-1 h-20 '
            >
              <Text 
                className='text-xl font-bold'
              >
                {item.country} ,
              </Text>
              <Text
                className='text-xl font-bold'
              >
                {item.capital}
              </Text>
            </View>
            <MaterialIcons 
              name="favorite" 
              size={30} 
              color={color} 
              style={{alignSelf:'flex-end'}} 
              className='items-center'
              onPress={()=>{Alert.alert("Adding To Favourite","Do You want to Add to Favourite",
                [
                  {
                    text: 'Cancel',
                    style:'cancel'
                  },

                  {
                    text: 'Yes',
                    onPress: ()=> {addItem(item.country, item.index + 1)},
                    style:'default'
                  }
                ]
              )}}/>
          </Pressable>
        </View>
    )
  }

  //  The function for scrolling To Top
  const scrollTop = (): void=>{
    scorllTop.current?.scrollToOffset({offset: 1 , animated: true })
  }
  return(
        <View className='flex-1 items-center bg-blue-300'>
            <Input 
              value={inpdata}
              onChangeText = {setInp}
              width={'90%'} 
              placeholder='Search City' 
              cursorColor={"black"} 
              returnKeyType='search'
            />
            

           <FlatList 
            ref={scorllTop}
            data={filteredData}
            renderItem={ ({ item }) => renderItems({ item }) }
            // key={(index:number) => index.toString}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle={{paddingHorizontal: 20}}
           />
          <Pressable onPress={()=>{scrollTop()}}>
              <View
                className='bg-blue-500 w-[70px] h-20 justify-center items-center rounded-full position: absolute bottom-10 ;'
                style={{left:75}}
              >
                <Feather name="chevron-up" size={24} color="black" />
              </View>
          </Pressable>

        </View>
    )
}
