export interface IRide {
    _departure_date: string;
    _arrival_date: string;
    _departure_city: string;
    _arrival_city: string;
    _train_name: string;
    long_course_suburban: string;
}

export interface IRidesStore {
    rides: IRide[];
}
