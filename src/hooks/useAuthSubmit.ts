import { useState } from "react"
import { useAuth } from "./useAuth"
import type { AuthResponse } from "../types/AuthResponse"

export function useAuthSubmit(url: string, onSuccess: () => void) {
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(data: Record<string, string>) {
        setError('')
        setLoading(true)
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(r => {
            if (r.status === 401) throw new Error("Identifiants incorrects")
            if (r.status === 404) throw new Error("Serveur introuvable")
            if (r.status === 409) throw new Error("L'email est déjà utilisé")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<AuthResponse>
        })
        .then(data => {
            login(data.pseudo, data.email)
            onSuccess()
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }

    return { handleSubmit, error, loading }
}
