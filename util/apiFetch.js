import { createContext, useContext, useState, useEffect } from "react"
// This is for the global inp from inp.js Folder
import Toast from "react-native-toast-message"
import { InpData } from "./Inps";
export const ShearData = createContext();

// This is for the Toast Section if their is error 
import { Notifier, NotifierComponents } from 'react-native-notifier';
export default function DataProvider({ children }) {

    // The inp of the User city
    useContext(InpData)

    const [weatherData, setWeatherData] = useState();
    const endpoint = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lagos?key=V2YTV3U8ZBRFMEQVLY5NBRXQZ`
    const [donno , setDon] = useState(false)

    // This is a value for the forecast to show and if
    // There is some kind of error
    const [shwFore , setFore] = useState(false)
    
    // This the function for the toast for Error Message
    const ActiveNetWork = ()=>{
        Notifier.showNotification({
            title: 'The request was Successfull',
            description: 'Weather Report have been fetched',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'success',
            },
        })
    }

    const NoNetwork =()=>{
        console.log("Sorry no Network ")
    }

    // React Hook for Fetching the APi Data
    useEffect(() => {
        async function get() {

            if (donno == true){
            try {
                const response = await fetch(endpoint);
                const data = await response.json()
                setWeatherData(data)
                setFore(true)
                console.log(data)
            }
            catch (error) {
                () => NoNetwork()
                console.log("NetWork Error kindly try Again Later")
            }}
            else{
                console.log("Sorry you can't fetch api!")
            }
        }
        get()
    },);

    const varing = "This the Varing"

    // The main Return for passing the datas Around
    return (
        <ShearData.Provider value={{ varing, weatherData , shwFore , setFore}}>
            {children}
        </ShearData.Provider>
    )
}

// Function for Calling the use Context in the file !...
export const PassContext = () => {
    return (
        useContext(ShearData)
    )
}