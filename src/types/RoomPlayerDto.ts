import type { RoomDto } from "./RoomDto"

export type PlayerDto = {
    id: number
    pseudo: string | null
}

export type RoomPlayerDto = {
    room: RoomDto
    players: PlayerDto[]
}
