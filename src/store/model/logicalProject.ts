import * as uuid from "uuid";

import { LogicalCircuit } from "./logicalCircuit";

export type LogicalProject = {
	id: string;
	startCircuitId: string;
	circuits: LogicalCircuit[];
};
