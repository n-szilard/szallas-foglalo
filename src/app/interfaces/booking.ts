export interface Booking {
    id: number,
    userId: number,
    accomodationId: number,
    startDate: string,
    endDate: string,
    persons: number,
    totalPrice: number,
    status: string,
    createdAt?: number,
    name?: string
}