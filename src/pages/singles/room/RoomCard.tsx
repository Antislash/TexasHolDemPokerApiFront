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

type RoomCardProps = RoomPlayerDto & {
    isMyRoom: boolean
    currentPseudo: string | null
    onJoin: (roomId: number) => void
    onLeave: (roomId: number) => void
    onStartGame: (roomId: number) => void
}

export function RoomCard({ room, players, isMyRoom, currentPseudo, onJoin, onLeave, onStartGame }: RoomCardProps) {
    const isDraft = room.status === RoomStatus.Draft

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
                    <div className="d-flex gap-2 flex-wrap mt-2">
                        {isMyRoom ? (
                            <button className="btn btn-sm btn-danger" onClick={() => onLeave(room.id)}>
                                Quitter
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-primary" onClick={() => onJoin(room.id)}>
                                Rejoindre
                            </button>
                        )}
                        {isMyRoom && isDraft && (
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => onStartGame(room.id)}
                            >
                                🃏 Démarrer la partie
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
