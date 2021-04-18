import React, { useState } from 'react'

const Context = React.createContext({})

export function MatriculadosContextProvider({ children }) {
  const [matriculados, setMATRICULADOS] = useState([])

  return <Context.Provider value={{ matriculados, setMATRICULADOS }}>
    {children}
  </Context.Provider>
}

export default Context