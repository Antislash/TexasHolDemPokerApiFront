import React, { useState } from "react"
import { AuthContext } from "../AuthContext"
import type { AuthContextType } from "../../types/AuthContextType"

interface AuthProviderProps extends React.PropsWithChildren {}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
    const [pseudo, setPseudo] = useState<string | null>(() => localStorage.getItem('pseudo'))
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem('email'))

    const login = (token: string, pseudo: string, email: string) => {
        localStorage.setItem('token', token)
        localStorage.setItem('pseudo', pseudo)
        localStorage.setItem('email', email)
        setToken(token)
        setPseudo(pseudo)
        setEmail(email)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('pseudo')
        localStorage.removeItem('email')
        setToken(null)
        setPseudo(null)
        setEmail(null)
    }

    const value: AuthContextType = { token, pseudo, email, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}