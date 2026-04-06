import type { PlayerDto, RoomPlayerDto } from '../../../types/RoomPlayerDto'

const AVATAR_COLORS = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#e91e63',
]

function getInitials(pseudo: string | null): string {
    if (!pseudo) return '?'
    return pseudo.charAt(0).toUpperCase()
}

function PlayerSeat({
    player,
    index,
    total,
    currentPseudo,
}: {
    player: PlayerDto
    index: number
    total: number
    currentPseudo: string | null
}) {
    const isMe = player.pseudo === currentPseudo
    const color = AVATAR_COLORS[player.id % AVATAR_COLORS.length]

    // Start from top (-π/2) and go clockwise
    const angle = (2 * Math.PI * index) / total - Math.PI / 2
    const radiusX = 270
    const radiusY = 195

    const x = Math.cos(angle) * radiusX
    const y = Math.sin(angle) * radiusY

    return (
        <div
            style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                zIndex: 10,
            }}
        >
            {/* Avatar */}
            <div
                style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: isMe ? '3px solid #ffd700' : '3px solid rgba(255,255,255,0.3)',
                    boxShadow: isMe
                        ? '0 0 16px rgba(255, 215, 0, 0.7), 0 4px 12px rgba(0,0,0,0.5)'
                        : '0 4px 12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'white',
                    userSelect: 'none',
                    flexShrink: 0,
                }}
            >
                {getInitials(player.pseudo)}
            </div>

            {/* Name badge */}
            <div
                style={{
                    backgroundColor: isMe ? 'rgba(255, 215, 0, 0.2)' : 'rgba(0,0,0,0.65)',
                    border: isMe ? '1px solid rgba(255,215,0,0.6)' : '1px solid rgba(255,255,255,0.1)',
                    color: isMe ? '#ffd700' : 'white',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: isMe ? '700' : '400',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.3px',
                }}
            >
                {player.pseudo ?? 'Anonyme'}
            </div>
        </div>
    )
}

function PokerTable() {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '380px',
                height: '220px',
                borderRadius: '110px',
                backgroundColor: '#1a6b3c',
                border: '12px solid #8B4513',
                boxShadow: `
                    inset 0 0 40px rgba(0,0,0,0.4),
                    0 8px 32px rgba(0,0,0,0.6),
                    0 0 0 4px #6B3410
                `,
                zIndex: 1,
            }}
        >
            {/* Inner felt texture ring */}
            <div
                style={{
                    position: 'absolute',
                    inset: '12px',
                    borderRadius: '90px',
                    border: '2px solid rgba(255,255,255,0.08)',
                    pointerEvents: 'none',
                }}
            />
            {/* Center logo */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'rgba(255,255,255,0.12)',
                    fontSize: '48px',
                    fontWeight: '900',
                    letterSpacing: '2px',
                    userSelect: 'none',
                }}
            >
                ♠
            </div>
        </div>
    )
}

export function GameTable({
    roomPlayer,
    currentPseudo,
    onExit,
}: {
    roomPlayer: RoomPlayerDto
    currentPseudo: string | null
    onExit: () => void
}) {
    const { room, players } = roomPlayer

    return (
        <div
            style={{
                minHeight: 'calc(100vh - 56px)',
                backgroundColor: '#1a1a2e',
                backgroundImage: 'radial-gradient(ellipse at center, #16213e 0%, #0f0f1a 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                fontFamily: 'system-ui, sans-serif',
            }}
        >
            {/* Sub-header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '700px',
                    marginBottom: '16px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>♠</span>
                    <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
                        {room.name}
                    </span>
                    <span
                        style={{
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontWeight: '600',
                        }}
                    >
                        EN COURS
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                        {players.length}{room.maxPlayers ? `/${room.maxPlayers}` : ''} joueurs
                    </span>
                </div>
                <button
                    onClick={onExit}
                    style={{
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        border: '1px solid rgba(231, 76, 60, 0.5)',
                        color: '#e74c3c',
                        padding: '5px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                    }}
                >
                    ← Retour aux rooms
                </button>
            </div>

            {/* Table area */}
            <div
                style={{
                    position: 'relative',
                    width: '700px',
                    height: '560px',
                    maxWidth: '100%',
                }}
            >
                <PokerTable />
                {players.map((player, i) => (
                    <PlayerSeat
                        key={player.id}
                        player={player}
                        index={i}
                        total={players.length}
                        currentPseudo={currentPseudo}
                    />
                ))}
            </div>

            {/* Legend */}
            {currentPseudo && players.some(p => p.pseudo === currentPseudo) && (
                <div
                    style={{
                        marginTop: '8px',
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}
                >
                    <span style={{ color: '#ffd700' }}>■</span>
                    <span>Votre position</span>
                </div>
            )}
        </div>
    )
}
