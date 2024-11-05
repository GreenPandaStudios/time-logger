export interface IHaveId {
	id: string;
}

export interface IActivity {
	description: string;
}

export interface IPerson {
	name: string;
	notes?: string;
}

export interface IPlace {
	description: string;
	coordinates?: {
		latitude: number;
		longitude: number;
	}[];
}

export interface IExperience {
	activity?: IActivity;
	place?: IPlace;
	rating?: number;
	cognitiveFunction?: number;
	people: IPerson[];
	start: number;
	end?: number;
	journal?: string;
	coordinates?: {
		latitude: number;
		longitude: number;
	};
}
