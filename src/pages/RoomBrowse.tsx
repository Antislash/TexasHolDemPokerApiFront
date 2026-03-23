import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useJoinRoom } from "../hooks/useJoinRoom"
import { useLeaveRoom } from "../hooks/useLeaveRoom";
import { useRooms } from "../hooks/useRooms";
import { RoomCard } from "./singles/room/RoomCard";
import { RoomCreate } from "./singles/room/RoomCreate";

export function RoomBrowse() {
    const { isAuthenticated, pseudo } = useAuth()
    const { rooms, error, loading, refresh } = useRooms()
    const { joinRoom, error: joinError } = useJoinRoom(refresh)
    const { leaveRoom, error: leaveError } = useLeaveRoom(refresh)

    if (!isAuthenticated) return null

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Rooms</h2>
                <RoomCreate onCreated={refresh} />
            </div>
            {error && <Alert type="danger">{error.toString()}</Alert>}
            {joinError && <Alert type="danger">{joinError}</Alert>}
            {leaveError && <Alert type="danger">{leaveError}</Alert>}
            {loading && <Spinner />}
            {!loading && rooms.length === 0 && (
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
                    />
                ))}
            </div>
        </div>
    )
}
