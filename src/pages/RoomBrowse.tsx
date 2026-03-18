import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useRooms } from "../hooks/useRooms";
import { RoomStatus } from "../types/RoomDto";
import type { RoomPlayerDto } from "../types/RoomPlayerDto";
import { RoomCreate } from "./singles/room/RoomCreate";

const statusLabel: Record<RoomStatus, string> = {
    [RoomStatus.Draft]: "En attente",
    [RoomStatus.Playing]: "En cours",
    [RoomStatus.Deleted]: "Supprimée",
}

const statusBadge: Record<RoomStatus, string> = {
    [RoomStatus.Draft]: "secondary",
    [RoomStatus.Playing]: "success",
    [RoomStatus.Deleted]: "danger",
}

function RoomCard({ room, players, isMyRoom }: RoomPlayerDto & { isMyRoom: boolean }) {
    return (
        <div className="col">
            <div className={`card h-100${isMyRoom ? " border-warning border-2" : ""}`}
                 style={isMyRoom ? { backgroundColor: "#fffbea" } : undefined}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title mb-1">{room.name}</h5>
                        {isMyRoom && (
                            <span className="badge bg-warning text-dark ms-2">Mes rooms</span>
                        )}
                    </div>
                    <span className={`badge bg-${statusBadge[room.status]}`}>
                        {statusLabel[room.status]}
                    </span>
                    <p className="card-text mt-2 text-muted">
                        {players.length}{room.maxPlayers ? `/${room.maxPlayers}` : ""} joueurs
                    </p>
                </div>
            </div>
        </div>
    )
}

export function RoomBrowse() {
    const { isAuthenticated, pseudo } = useAuth()
    const { rooms, error, loading, refresh } = useRooms()

    if (!isAuthenticated) return null

    return (
        <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Rooms</h2>
                <RoomCreate onCreated={refresh} />
            </div>
            {error && <Alert type="danger">{error.toString()}</Alert>}
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
                    />
                ))}
            </div>
        </div>
    )
}
