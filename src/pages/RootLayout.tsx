import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRooms } from '../hooks/useRooms'
import { Navigation } from './singles/login/Navigation'
import { RoomStatus } from '../types/RoomDto'
import type { RoomPlayerDto } from '../types/RoomPlayerDto'

export type RoomsOutletContext = {
    rooms: RoomPlayerDto[]
    roomsError: string
    roomsLoading: boolean
    refresh: () => void
    leaveGroup: (roomId: number) => void
}

export function RootLayout() {
    const navigate = useNavigate()
    const { pseudo } = useAuth()
    const { rooms, error, loading, refresh, leaveGroup } = useRooms()

    const myPlayingRooms = rooms.filter(
        rp => rp.room.status === RoomStatus.Playing && rp.players.some(p => p.pseudo === pseudo)
    )

    function handleEnterGame(rp: RoomPlayerDto) {
        navigate(`/game/${rp.room.id}`, { state: rp })
    }

    const context: RoomsOutletContext = {
        rooms,
        roomsError: error,
        roomsLoading: loading,
        refresh,
        leaveGroup,
    }

    return (
        <>
            <Navigation myPlayingRooms={myPlayingRooms} onEnterGame={handleEnterGame} />
            <Outlet context={context} />
        </>
    )
}
