
interface IHaveId {
    id: string;
}

export interface IActivity extends IHaveId { 
    description: string;
    
}

export interface IPerson extends IHaveId {
    name: string;
}

export interface IPlace extends IHaveId {
    description: string;
}