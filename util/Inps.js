import { createContext, useContext, useState } from "react"
// This is for the global inp from inp.js Folder

export const InpData = createContext();

export default function Inpss({ children }) {
    const [inpdata , setInp]= useState("")

    const varing = "This the Varing"
    return (
        <InpData.Provider value={{ inpdata, setInp}}>
            {children}
        </InpData.Provider>
    )
}

export const PassinCon = () => {
    return (
        useContext(InpData)
    )
}