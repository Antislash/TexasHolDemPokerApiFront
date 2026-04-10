import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { useAuthStore } from "../store/authStore";
import { useJoinRoom } from "../hooks/useJoinRoom"
import { useLeaveRoom } from "../hooks/useLeaveRoom";
import { useStartGame } from "../hooks/useStartGame";
import { RoomStatus } from "../types/RoomDto";
import type { RoomPlayerDto } from "../types/RoomPlayerDto";
import { RoomCard } from "./singles/room/RoomCard";
import { RoomCreate } from "./singles/room/RoomCreate";

type RoomBrowseProps = {
    rooms: RoomPlayerDto[]
    roomsError: string
    roomsLoading: boolean
    onRefresh: () => void
    onEnterGame: (rp: RoomPlayerDto) => void
    leaveGroup: (roomId: number) => void
}

export function RoomBrowse({ rooms, roomsError, roomsLoading, onRefresh, onEnterGame, leaveGroup }: RoomBrowseProps) {
    const { isAuthenticated, pseudo } = useAuthStore()
    const { joinRoom, error: joinError } = useJoinRoom(onRefresh)
    const { leaveRoom, error: leaveError } = useLeaveRoom(onRefresh, leaveGroup)
    const { startGame, error: startError } = useStartGame((roomId) => {
        const rp = rooms.find(r => r.room.id === roomId)
        if (rp) onEnterGame({ room: { ...rp.room, status: RoomStatus.Playing }, players: rp.players })
    })

    if (!isAuthenticated) return null

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Rooms</h2>
                <RoomCreate onCreated={onRefresh} />
            </div>
            {roomsError && <Alert type="danger">{roomsError}</Alert>}
            {joinError && <Alert type="danger">{joinError}</Alert>}
            {leaveError && <Alert type="danger">{leaveError}</Alert>}
            {startError && <Alert type="danger">{startError}</Alert>}
            {roomsLoading && <Spinner />}
            {!roomsLoading && rooms.length === 0 && (
                <p className="text-muted">Aucune room disponible.</p>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-3">
                {rooms.map((rp, i) => (
                    <RoomCard
                        key={i}
                        room={rp.room}
                        players={rp.players}
                        isMyRoom={rp.players.some(p => p.pseudo === pseudo)}
                        currentPseudo={pseudo}
                        onJoin={joinRoom}
                        onLeave={leaveRoom}
                        onStartGame={startGame}
                    />
                ))}
            </div>
        </div>
    )
}
