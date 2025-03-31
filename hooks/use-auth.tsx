"use client"

import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Define the type for the context value
type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
})

// Define props type for the AuthProvider
type AuthProviderProps = {
  children: ReactNode
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for auth token in local storage or cookies
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken")
      if (token) {
        setIsLoggedIn(true)
      }
    }
  }, [])

  const login = () => {
    // Simulate successful login
    localStorage.setItem("authToken", "loggedIn")
    setIsLoggedIn(true)
    router.push("/dashboard")
  }

  const logout = () => {
    // Simulate successful logout
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    router.push("/")
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

// Export the hook to use the context
export const useAuth = () => useContext(AuthContext)

