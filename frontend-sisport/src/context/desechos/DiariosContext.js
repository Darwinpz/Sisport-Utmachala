import React, { useState } from 'react'

const Context = React.createContext({})

export function DiariosContextProvider({ children }) {
  const [diarios, setDIARIOS] = useState([])

  return <Context.Provider value={{ diarios, setDIARIOS }}>
    {children}
  </Context.Provider>
}

export default Context