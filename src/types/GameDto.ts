import type { RoomDto } from "./RoomDto"
import type { PlayerDto } from "./RoomPlayerDto"

export const GameStatus = {
    Waiting: 0,
    Playing: 1,
    Finished: 2,
} as const

export type GameStatus = typeof GameStatus[keyof typeof GameStatus]

export type GamePlayerDto = {
    gameId: number
    playerId: number
    player: PlayerDto
    stack: number
    currentBet: number
    hasFolded: boolean
}

export type GameDto = {
    id: number
    roomId: number
    room: RoomDto
    dealerPlayerId: number | null
    currentPlayerId: number | null
    smallBlindAmount: number
    bigBlindAmount: number
    status: GameStatus
    createdAt: string
    gamePlayers: GamePlayerDto[]
}
