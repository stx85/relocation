export interface RelocationRequest {
    id: number,
    clientName: string,
    fromCity: string,
    fromZip: number,
    fromStreet: string,
    fromFloor: number,
    fromElevator: boolean,
    toCity: string,
    toZip: number,
    toStreet: string,
    toFloor: number,
    toElevator: boolean,
    packagingService: boolean,
    relocationDate: Date
}
