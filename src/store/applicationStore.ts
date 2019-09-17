import * as uuid from "uuid";
import { Store } from "@easm/core";
import { createHook } from "@easm/react";

import { LogicalProject, DefaultCategoy, LogicalCircuit, Zoom } from "./model/types";

type ApplicationStoreState = {
	ui: {
		selectedCircuitId: string;
		zoom: Zoom;
	},
	data: {
		project: LogicalProject
	}
};

const mainCircuit: LogicalCircuit = {
	id: uuid(),
	name: "New Circuit",
	category: null,
	showVisualElements: false
};

const defaultCategoy: DefaultCategoy = {
	name: null,
	circuits: [mainCircuit],
	isCollapsed: false
};

const project: LogicalProject = {
	id: uuid(),
	startCircuitId: mainCircuit.id,
	categories: [defaultCategoy],
	textNoteCategory: true,
	inputOutputCategory: true,
	primitivesCategory: true,
	zoom: Zoom["100%"]
};

const applicationStore = new Store<ApplicationStoreState>({
	ui: {
		selectedCircuitId: project.startCircuitId,
		zoom: Zoom["100%"]
	},
	data: { project }
});

export const useUIStore = createHook(applicationStore.state.ui);
export const useDataStore = createHook(applicationStore.state.data);
