import React, { useState } from 'react'

const Context = React.createContext({})

export function PortafoliosContextProvider({ children }) {
  const [portafolios, setPORTAFOLIOS] = useState([])

  return <Context.Provider value={{ portafolios, setPORTAFOLIOS }}>
    {children}
  </Context.Provider>
}

export default Context