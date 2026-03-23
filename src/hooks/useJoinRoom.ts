import { useState } from "react"
import { useAuth } from "./useAuth"
import type { PlayerDto } from "../types/RoomPlayerDto"
import { API_URL } from "../config"

export function useJoinRoom(onSuccess: () => void) {
    const { email } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function joinRoom(roomId: number) {
        setError('')
        setLoading(true)

        // 1. POST /player?email=... → PlayerDto
        fetch(`${API_URL}/player?email=${encodeURIComponent(email ?? '')}`, {
            method: 'POST',
            credentials: 'include',
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<PlayerDto>
        })
        // 2. PATCH /roomPlayer/{roomId}/{playerId} → rejoint la room
        .then(player =>
            fetch(`${API_URL}/roomPlayer/${roomId}/${player.id}`, {
                method: 'PATCH',
                credentials: 'include',
            })
            .then(r => {
                if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
                if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            })
        )
        .then(() => onSuccess())
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }

    return { joinRoom, error, loading }
}
