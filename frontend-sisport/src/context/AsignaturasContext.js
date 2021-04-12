import React, { useState } from 'react'

const Context = React.createContext({})

export function AsignaturasContextProvider({ children }) {
  const [asignaturas, setASIGNATURAS] = useState([])

  return <Context.Provider value={{ asignaturas, setASIGNATURAS }}>
    {children}
  </Context.Provider>
}

export default Context