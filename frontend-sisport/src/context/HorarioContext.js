import React, { useState } from 'react'

const Context = React.createContext({})

export function HorariosContextProvider({ children }) {
  const [horario, setHORARIO] = useState([])

  return <Context.Provider value={{ horario, setHORARIO }}>
    {children}
  </Context.Provider>
}

export default Context