import * as uuid from "uuid";
import { get, set } from "@easm/core";

import { useDataStore, useUIStore } from "../applicationStore";

//#region Constants
const dataStore = useDataStore();
const uiStore = useUIStore();
//#endregion

//#region Types
export type LogicalProject = {
	id: string;
	startCircuitId: string;
	categories: Category[];
	textNoteCategory: boolean;
	inputOutputCategory: boolean;
	primitivesCategory: boolean;
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
//#endregion

//#region Actions
export const createNewProjectAction = () => {
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
		primitivesCategory: true
	};

	set(dataStore.state.project, project);
	set(uiStore.state.selectedCircuitId, project.startCircuitId);
};

export const expandOrCollapseCategoryAction = (category: Category) => {
	const categories = get(dataStore.state.project).categories;
	const index = categories.indexOf(category);
	set(dataStore.state.project.categories[index], { ...category, isCollapsed: !category.isCollapsed });
};

export const expandOrCollapseSpecialCategoryAction = (specialCategory: keyof Pick<LogicalProject, "textNoteCategory" | "inputOutputCategory" | "primitivesCategory">) => {
	const project = get(dataStore.state.project);
	set(dataStore.state.project[specialCategory], !project[specialCategory]);
};
//#endregion
