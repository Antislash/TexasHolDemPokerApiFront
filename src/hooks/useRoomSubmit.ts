import { useState } from "react"
import { RoomStatus } from "../types/RoomDto"

export function useRoomSubmit(onSuccess: () => void) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(data: Record<string, string>) {
        setError('')
        setLoading(true)
        fetch("https://localhost:44367/room", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: data.name, status: RoomStatus.Draft })
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
