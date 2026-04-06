import { useState } from "react"
import { API_URL } from "../config"
import { RoomStatus } from "../types/RoomDto"

export function useStartGame(onSuccess: (roomId: number) => void) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function startGame(roomId: number) {
        setError('')
        setLoading(true)

        fetch(`${API_URL}/room/${roomId}/status`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(RoomStatus.Playing),
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
        })
        .then(() => onSuccess(roomId))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }

    return { startGame, error, loading }
}
