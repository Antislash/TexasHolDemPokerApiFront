import React, { useState } from "react"
import { AuthContext } from "../AuthContext"
import type { AuthContextType } from "../../types/AuthContextType"

interface AuthProviderProps extends React.PropsWithChildren {}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(null)
    const [pseudo, setPseudo] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const login = (token: string, pseudo: string, email: string) => {
        setToken(token)
        setPseudo(pseudo)
        setEmail(email)
    }

    const logout = () => {
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