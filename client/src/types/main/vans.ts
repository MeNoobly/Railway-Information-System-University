export interface IVan {
    id?: number;
    capacity: number;
    reserved: number;
    train_id: number;
}

export interface IVansStore {
    vans: IVan[];
}
