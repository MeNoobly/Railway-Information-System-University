export interface ITrain {
    id: number;
    train_name: string;
    number_of_vans: string;
}

export interface ITrainStore {
    trains: ITrain[];
}
