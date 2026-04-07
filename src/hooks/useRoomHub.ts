import { useEffect, useRef } from "react"
import * as signalR from "@microsoft/signalr"
import { useAuth } from "./useAuth"
import { API_URL } from "../config"

export function useRoomHub(onUpdate: () => void) {
    const connectionRef = useRef<signalR.HubConnection | null>(null)
    const onUpdateRef = useRef(onUpdate)
    const pendingRoomsRef = useRef<number[]>([])
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        onUpdateRef.current = onUpdate
    }, [onUpdate])

    useEffect(() => {
        if (!isAuthenticated) return

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_URL}/hubs/poker`, {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build()

        connection.on("PlayerJoined", () => onUpdateRef.current())
        connection.on("PlayerLeft", () => onUpdateRef.current())

        connection.start()
            .then(() => {
                pendingRoomsRef.current.forEach(id =>
                    connection.invoke("JoinRoomGroup", id).catch(console.error)
                )
                pendingRoomsRef.current = []
            })
            .catch(console.error)

        connectionRef.current = connection

        return () => {
            connection.stop()
            connectionRef.current = null
        }
    }, [isAuthenticated])

    function subscribeToRooms(roomIds: number[]) {
        if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
            roomIds.forEach(id =>
                connectionRef.current!.invoke("JoinRoomGroup", id).catch(console.error)
            )
        } else {
            pendingRoomsRef.current = roomIds
        }
    }

    function joinGroup(roomId: number) {
        connectionRef.current?.invoke("JoinRoomGroup", roomId).catch(console.error)
    }

    function leaveGroup(roomId: number) {
        connectionRef.current?.invoke("LeaveRoomGroup", roomId).catch(console.error)
    }

    return { joinGroup, leaveGroup, subscribeToRooms }
}
