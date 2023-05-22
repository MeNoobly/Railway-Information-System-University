export interface ITrainModalsProps {
    id?: number;
    show: boolean;
    handleClose: () => void;
    defaultTrainName?: string;
    defaultNumberOfVans?: string;
}

export interface IVanModalsProps {
    id?: number;
    show: boolean;
    handleClose: () => void;
    defaultCapacity?: number;
    defaultReserved?: number;
    defaultTrainId?: number;
}

export interface IRideModalsProps {
    id?: number;
    show: boolean;
    handleClose: () => void;
    defaultDepartureDate?: string;
    defaultArrivalDate?: string;
    defaultDepartureCity?: string;
    defaultArrivalCity?: string;
    defaultTrainId?: number;
}
