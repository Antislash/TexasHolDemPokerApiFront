// Type for AuthContext
export type AuthContextType = {
    isAuthenticated: boolean
    pseudo: string | null
    email: string | null
    login: (pseudo: string, email: string) => void
    logout: () => void
}