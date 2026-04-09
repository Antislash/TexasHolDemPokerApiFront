import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import type { RoomPlayerDto } from "../../../types/RoomPlayerDto";
import { Login } from "./Login";

type NavigationProps = {
    myPlayingRooms: RoomPlayerDto[]
    onEnterGame: (rp: RoomPlayerDto) => void
}

export function Navigation({ myPlayingRooms, onEnterGame }: NavigationProps) {
    const [open, setOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    return (
        <nav className="navbar navbar-light bg-light px-3">
            <Link to="/rooms" className="navbar-brand">♠ Poker</Link>
            <div className="d-flex gap-3 align-items-center">
                {isAuthenticated && (
                    <div className="position-relative">
                        <button
                            className="btn btn-sm btn-outline-success"
                            disabled={myPlayingRooms.length === 0}
                            onClick={() => setOpen(o => !o)}
                        >
                            Partie en cours {myPlayingRooms.length > 0 && `(${myPlayingRooms.length})`}
                        </button>
                        {open && myPlayingRooms.length > 0 && (
                            <ul
                                className="dropdown-menu show position-absolute"
                                style={{ top: '110%', left: 0, minWidth: '180px', zIndex: 1000 }}
                            >
                                {myPlayingRooms.map(rp => (
                                    <li key={rp.room.id}>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => { onEnterGame(rp); setOpen(false) }}
                                        >
                                            🃏 {rp.room.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                <Login />
            </div>
        </nav>
    )
}
