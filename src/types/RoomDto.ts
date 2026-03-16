export type RoomDto = {
    name: string
    status: RoomStatus
}

export enum RoomStatus {
    Draft = 0,
    Playing = 1,
    Deleted = 2
}
