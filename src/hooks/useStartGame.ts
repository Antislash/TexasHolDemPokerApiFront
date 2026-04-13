import { useState } from "react"
import { API_URL } from "../config"

export function useStartGame(onSuccess: (roomId: number) => void) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function startGame(roomId: number) {
        setError('')
        setLoading(true)

        // POST /game/{roomId} → lance la partie et copie les joueurs depuis RoomPlayer
        fetch(`${API_URL}/game/${roomId}`, {
            method: 'POST',
            credentials: 'include',
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
