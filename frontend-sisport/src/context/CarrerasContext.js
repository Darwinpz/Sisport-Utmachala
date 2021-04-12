import React, { useState } from 'react'

const Context = React.createContext({})

export function CarrerasContextProvider({ children }) {
  const [carreras, setCARRERAS] = useState([])

  return <Context.Provider value={{ carreras, setCARRERAS }}>
    {children}
  </Context.Provider>
}

export default Context