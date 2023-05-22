export interface IRide {
    id?: number;
    departure_date: string;
    arrival_date: string;
    departure_city: string;
    arrival_city: string;
    train_id: number;
}

export interface IRidesStore {
    rides: IRide[];
}
