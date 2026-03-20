export interface ParkImage {
    url: string
    altText: string
    title: string
    caption: string
}

export interface ParkAddress {
    line1: string
    city: string
    stateCode: string
    postalCode: string
    type: 'Physical' | 'Mailing'
}

export interface ParkEntranceFee {
    cost: string
    description: string
    title: string
}

export interface OperatingHours {
    name: string
    description: string
    standardHours: {
        monday: string
        tuesday: string
        wednesday: string
        thursday: string
        friday: string
        saturday: string
        sunday: string
    }
}

export interface ParkActivity {
    id: string
    name: string
}

export interface Park {
    id: string
    parkCode: string
    fullName: string
    name: string
    description: string
    states: string
    latitude: string
    longitude: string
    images: ParkImage[]
    addresses: ParkAddress[]
    entranceFees: ParkEntranceFee[]
    operatingHours: OperatingHours[]
    activities: ParkActivity[]
    designation: string
    url: string
}

export interface NpsApiResponse<T> {
    data: T[]
    total: string
    limit: string
    start: string
}