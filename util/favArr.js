import { useContext , createContext , useState} from "react"

export const Favarray = createContext();
export default function favArr({  children  }) {
     const [favarr , setArr] = useState([])

  return (
    <Favarray.Provider value={{ favarr, setArr }}>
        {children}
    </Favarray.Provider>
  )
}

export const FavRun =()=>{
    return(
        useContext(Favarray)
    )
}