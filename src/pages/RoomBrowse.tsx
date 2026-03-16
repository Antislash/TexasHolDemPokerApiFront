import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { useRooms } from "../hooks/useRooms";
import { RoomStatus, type RoomDto } from "../types/RoomDto";
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

function RoomCard({ room }: { room: RoomDto }) {
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <span className={`badge bg-${statusBadge[room.status]}`}>
                        {statusLabel[room.status]}
                    </span>
                </div>
            </div>
        </div>
    )
}

export function RoomBrowse() {
    const { isAuthenticated } = useAuth()
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
                {rooms.map((room, i) => <RoomCard key={i} room={room} />)}
            </div>
        </div>
    )
}
