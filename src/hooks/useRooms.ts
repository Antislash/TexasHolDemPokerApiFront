import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import type { RoomPlayerDto } from "../types/RoomPlayerDto"
import { API_URL } from "../config"
import { useRoomHub } from "./useRoomHub"

export function useRooms() {
    const { isAuthenticated, logout } = useAuth()

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
            if (r.status === 401) { logout(); return }
            if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
            return r.json() as Promise<RoomPlayerDto[]>
        })
        .then(data => { if (data) setRooms(data) })
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (isAuthenticated) fetchRooms()
    }, [isAuthenticated])

    const { joinGroup, leaveGroup } = useRoomHub(fetchRooms)

    return { rooms, error, loading, refresh: fetchRooms, joinGroup, leaveGroup }
}
