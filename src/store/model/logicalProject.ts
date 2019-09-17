import * as uuid from "uuid";
import { get, set } from "@easm/core";

import { useDataStore, useUIStore } from "../applicationStore";
import { LogicalProject, Category, DefaultCategoy, LogicalCircuit, Zoom } from "./types";

//#region Constants
const dataStore = useDataStore();
const uiStore = useUIStore();
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
		primitivesCategory: true,
		zoom: Zoom["100%"]
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

export const setZoomAction = (zoom: Zoom) => {
	set(uiStore.state.zoom, zoom);
};
//#endregion
