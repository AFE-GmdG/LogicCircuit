import * as uuid from "uuid";

import { Store } from "@easm/core";
import { createHook } from "@easm/react";

import { LogicalCircuit, createEmptyLogicalCircuit } from "./model/logicalCircuit";

type ApplicationStoreState = {
	ui: {
		selectedCircuitId: string;
	},
	data: {
		circuits: LogicalCircuit[],
		currentProjectId: string
	}
};

const mainCircuit = createEmptyLogicalCircuit();
const c1 = createEmptyLogicalCircuit();
c1.category = "LEDs";
c1.name = "LED-Leiste";
c1.showVisualElements = true;
const c2 = createEmptyLogicalCircuit();
c2.category = "Tests";
c2.name = "Test: LED-Leiste";
const c3 = createEmptyLogicalCircuit();
c3.category = "Tests";
c3.name = "Test: SR-Latch";
const c4 = createEmptyLogicalCircuit();
c4.name = "SR-Latch";

const applicationStore = new Store<ApplicationStoreState>({
	ui: {
		selectedCircuitId: mainCircuit.id
	},
	data: {
		circuits: [mainCircuit, c1, c2, c3, c4],
		currentProjectId: uuid()
	}
});

export const useUIStore = createHook(applicationStore.state.ui);
export const useDataStore = createHook(applicationStore.state.data);
