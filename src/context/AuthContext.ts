import { createContext } from "react"
import type { AuthContextType } from "../types/AuthContextType"

// Context
export const AuthContext = createContext<AuthContextType | null>(null)