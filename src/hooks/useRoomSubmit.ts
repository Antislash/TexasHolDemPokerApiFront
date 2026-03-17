import { useState } from "react"
import { useAuth } from "./useAuth"
import { RoomStatus } from "../types/RoomDto"
import { API_URL } from "../config"

export function useRoomSubmit(onSuccess: () => void) {
    const { email } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(data: Record<string, string>) {
        setError('')
        setLoading(true)
        fetch(`${API_URL}/room?email=${encodeURIComponent(email ?? '')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                status: RoomStatus.Draft,
                ...(data.maxPlayers ? { maxPlayers: parseInt(data.maxPlayers) } : {})
            })
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (r.status === 404) throw new Error("Serveur introuvable")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            onSuccess()
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }

    return { handleSubmit, error, loading }
}
