import React, { useState } from "react"
import { AuthContext } from "../AuthContext"
import type { AuthContextType } from "../../types/AuthContextType"
import { API_URL } from "../../config"

interface AuthProviderProps extends React.PropsWithChildren {}

export function AuthProvider({ children }: AuthProviderProps) {
    const [pseudo, setPseudo] = useState<string | null>(() => localStorage.getItem('pseudo'))
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem('email'))

    const login = (pseudo: string, email: string) => {
        localStorage.setItem('pseudo', pseudo)
        localStorage.setItem('email', email)
        setPseudo(pseudo)
        setEmail(email)
    }

    const logout = () => {
        fetch(`${API_URL}/login/logout`, { method: 'POST', credentials: 'include' })
        localStorage.removeItem('pseudo')
        localStorage.removeItem('email')
        setPseudo(null)
        setEmail(null)
    }

    const value: AuthContextType = { isAuthenticated: pseudo !== null, pseudo, email, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}