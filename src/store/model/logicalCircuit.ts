import * as uuid from "uuid";

export type LogicalCircuit = {
	id: string;
	name: string;
	category: string | null;
	showVisualElements: boolean;
};

export const createEmptyLogicalCircuit: () => LogicalCircuit = () => ({
	id: uuid(),
	name: "New Circuit",
	category: null,
	showVisualElements: false
});
