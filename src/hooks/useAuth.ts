import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import type { AuthContextType } from "../types/AuthContextType"

/**
 * Hook permettant d'accéder au contexte d'authentification.
 * Doit être utilisé dans un composant enfant de AuthProvider.
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}