import React, { useState } from 'react'

const Context = React.createContext({})

export function UsuariosContextProvider({ children }) {
  const [usuarios, setUSUARIOS] = useState([])

  return <Context.Provider value={{ usuarios, setUSUARIOS }}>
    {children}
  </Context.Provider>
}

export default Context