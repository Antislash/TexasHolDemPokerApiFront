import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import type { RoomPlayerDto } from "../types/RoomPlayerDto"
import { API_URL } from "../config"

export function useRooms() {
    const { isAuthenticated } = useAuth()

    const [rooms, setRooms] = useState<RoomPlayerDto[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchRooms() {
        setError('')
        setLoading(true)
        fetch(`${API_URL}/roomPlayer`, {
            credentials: 'include'
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<RoomPlayerDto[]>
        })
        .then(setRooms)
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (isAuthenticated) fetchRooms()
    }, [isAuthenticated])

    return { rooms, error, loading, refresh: fetchRooms }
}
