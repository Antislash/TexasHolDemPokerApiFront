import { useState, useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import type { RoomDto } from "../types/RoomDto"
import type { RoomPlayerDto } from "../types/RoomPlayerDto"
import { API_URL } from "../config"
import { useRoomHub } from "./useRoomHub"

export function useRooms() {
    const { isAuthenticated, logout } = useAuthStore()

    const [rooms, setRooms] = useState<RoomPlayerDto[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function fetchRooms() {
        setError('')
        setLoading(true)

        // 1. GET /room → RoomDto[]
        fetch(`${API_URL}/room`, { credentials: 'include' })
            .then(r => {
                if (r.status === 401) { logout(); return }
                if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
                return r.json() as Promise<RoomDto[]>
            })
            // 2. GET /room/{id}/players → RoomPlayerDto pour chaque room en parallèle
            .then(roomList => {
                if (!roomList) return
                return Promise.all(
                    roomList.map(room =>
                        fetch(`${API_URL}/room/${room.id}/players`, { credentials: 'include' })
                            .then(r => {
                                if (!r.ok) throw new Error(`Erreur serveur (${r.status})`)
                                return r.json() as Promise<RoomPlayerDto>
                            })
                    )
                )
            })
            .then(data => {
                if (data) {
                    setRooms(data)
                    subscribeToRooms(data.map(rp => rp.room.id))
                }
            })
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (isAuthenticated) fetchRooms()
    }, [isAuthenticated])

    const { leaveGroup, subscribeToRooms } = useRoomHub(fetchRooms)

    return { rooms, error, loading, refresh: fetchRooms, leaveGroup }
}
