import { useState } from "react"
import { useAuth } from "./useAuth"
import { RoomStatus } from "../types/RoomDto"
import type { RoomDto } from "../types/RoomDto"
import type { PlayerDto } from "../types/RoomPlayerDto"
import { API_URL } from "../config"

export function useRoomSubmit(onSuccess: () => void) {
    const { email } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(data: Record<string, string>) {
        setError('')
        setLoading(true)

        // 1. POST /Player?email=... → PlayerDto
        fetch(`${API_URL}/player?email=${encodeURIComponent(email ?? '')}`, {
            method: 'POST',
            credentials: 'include',
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<PlayerDto>
        })
        // 2. POST /Room → RoomDto
        .then(player =>
            fetch(`${API_URL}/room`, {
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
                if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
                return r.json() as Promise<RoomDto>
            })
            .then(room => ({ player, room }))
        )
        // 3. POST /RoomPlayer/{roomId}/{playerId} → associe le joueur à la salle
        .then(({ player, room }) =>
            fetch(`${API_URL}/roomPlayer/${room.id}/${player.id}`, {
                method: 'POST',
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

    return { handleSubmit, error, loading }
}
