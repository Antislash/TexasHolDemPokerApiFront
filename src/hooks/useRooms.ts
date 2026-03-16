import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import type { RoomDto } from "../types/RoomDto"

export function useRooms() {
    const { isAuthenticated } = useAuth()

    const [rooms, setRooms] = useState<RoomDto[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchRooms() {
        setError('')
        setLoading(true)
        fetch("https://localhost:44367/room", {
            credentials: 'include'
        })
        .then(r => {
            if (r.status === 401) throw new Error("Non autorisé, veuillez vous connecter")
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<RoomDto[]>
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
