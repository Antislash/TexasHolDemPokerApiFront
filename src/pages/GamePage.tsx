import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { GameTable } from './singles/game/GameTable'
import type { RoomPlayerDto } from '../types/RoomPlayerDto'

export function GamePage() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const roomPlayer = state as RoomPlayerDto | null
    const { pseudo } = useAuth()

    if (!roomPlayer) {
        return <Navigate to="/rooms" replace />
    }

    return (
        <GameTable
            roomPlayer={roomPlayer}
            currentPseudo={pseudo}
            onExit={() => navigate('/rooms')}
        />
    )
}
