import { useNavigate, useOutletContext } from 'react-router-dom'
import type { RoomsOutletContext } from './RootLayout'
import { RoomBrowse } from './RoomBrowse'
import type { RoomPlayerDto } from '../types/RoomPlayerDto'

export function RoomsPage() {
    const navigate = useNavigate()
    const { rooms, roomsError, roomsLoading, refresh, leaveGroup } = useOutletContext<RoomsOutletContext>()

    function handleEnterGame(rp: RoomPlayerDto) {
        navigate(`/game/${rp.room.id}`, { state: rp })
    }

    return (
        <div className="container">
            <RoomBrowse
                rooms={rooms}
                roomsError={roomsError}
                roomsLoading={roomsLoading}
                onRefresh={refresh}
                onEnterGame={handleEnterGame}
                leaveGroup={leaveGroup}
            />
        </div>
    )
}
