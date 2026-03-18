export const RoomStatus = {
    Draft: 0,
    Playing: 1,
    Deleted: 2,
} as const

export type RoomStatus = typeof RoomStatus[keyof typeof RoomStatus]

export type RoomDto = {
    id: number
    name: string
    status: RoomStatus
    maxPlayers?: number
}
