import { RoomStatus } from "../../../types/RoomDto";
import type { RoomPlayerDto } from "../../../types/RoomPlayerDto";

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

export function RoomCard({ room, players, isMyRoom, currentPseudo, onJoin, onLeave }: RoomPlayerDto & { isMyRoom: boolean, currentPseudo: string | null, onJoin: (roomId: number) => void, onLeave: (roomId: number) => void }) {
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
                    <ul className="list-unstyled mb-2">
                        {players.map(p => (
                            <li key={p.id} className={p.pseudo === currentPseudo ? "text-primary fw-semibold" : "text-muted"}>
                                {p.pseudo ?? "Anonyme"}
                            </li>
                        ))}
                    </ul>
                    {isMyRoom ? (
                        <button className="btn btn-sm btn-danger mt-2" onClick={() => onLeave(room.id)}>
                            Quitter
                        </button>
                    ) : (
                        <button className="btn btn-sm btn-primary mt-2" onClick={() => onJoin(room.id)}>
                            Rejoindre
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
