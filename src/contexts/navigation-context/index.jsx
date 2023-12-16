import { createContext, useState } from 'react'

const defaultContext = {
  isSideBarOpen: true,
  toggleSideBar: () => {},
}

export const NavigationContext = createContext(defaultContext)

export const NavigationProvider = ({ children }) => {
  const [isSideBarOpen, setSideBarOpen] = useState(defaultContext.isSideBarOpen)
  return (
    <NavigationContext.Provider
      value={{
        isSideBarOpen,
        setSideBarOpen,
        toggleSideBar: () => setSideBarOpen((prev) => !prev),
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
