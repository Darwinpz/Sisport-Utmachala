import React, {useState} from 'react'
import { useEffect } from 'react'

const Context = React.createContext({})

export function UserContextProvider ({children}) {
  const [user, setUSER] = useState(
    () => window.sessionStorage.getItem('user')
  )
  
  return <Context.Provider value={{
    user,
    setUSER
  }}>
    {children}
  </Context.Provider>
}

export default Context