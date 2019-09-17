//#region Types
export type LogicalProject = {
	id: string;
	startCircuitId: string;
	categories: Category[];
	textNoteCategory: boolean;
	inputOutputCategory: boolean;
	primitivesCategory: boolean;
	zoom: Zoom;
};

export type Category =
	DefaultCategoy |
	NamedCategory;

export type DefaultCategoy = {
	name: null;
	circuits: LogicalCircuit[];
	isCollapsed: boolean;
};

export type NamedCategory = {
	name: string;
	circuits: LogicalCircuit[];
	isCollapsed: boolean;
};

export type LogicalCircuit = {
	id: string;
	name: string;
	category: string | null;
	showVisualElements: boolean;
};

export enum Zoom {
	"25%" = 0.25,
	"50%" = 0.50,
	"75%" = 0.75,
	"100%" = 1.00,
	"125%" = 1.25,
	"150%" = 1.50,
	"175%" = 1.75,
	"200%" = 2.00
}
//#endregion
