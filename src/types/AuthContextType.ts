// Type for AuthContext
export type AuthContextType = {
    token: string | null
    pseudo: string | null
    email: string | null
    login: (token: string, pseudo: string, email: string) => void
    logout: () => void
}