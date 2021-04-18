import React, { useState } from 'react'

const Context = React.createContext({})

export function PortafolioContextProvider({ children }) {
  const [portafolio, setPORTAFOLIO] = useState([])

  return <Context.Provider value={{ portafolio, setPORTAFOLIO }}>
    {children}
  </Context.Provider>
}

export default Context