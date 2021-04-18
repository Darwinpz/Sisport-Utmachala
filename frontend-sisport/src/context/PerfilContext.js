import React, { useState } from 'react'

const Context = React.createContext({})

export function PerfilContextProvider({ children }) {
  const [perfil, setPERFIL] = useState([])

  return <Context.Provider value={{ perfil, setPERFIL }}>
    {children}
  </Context.Provider>
}

export default Context