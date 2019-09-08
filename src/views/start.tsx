import * as React from "react";
import { get } from "@easm/core";

import { orThrow } from "../common";
import { Theme, useTheme } from "../themes";
import { useUIStore, useDataStore } from "../store";

import { LogicalCircuit } from "../store/model/logicalProject";

import { MenuBar } from "../components/menuBar";
import { StatusBar } from "../components/statusBar";
import { Explorer } from "../components/explorer";
import { Board } from "../components/board";

//#region Constants
const themedClasses = (theme: Theme) => ({
	start: {
		backgroundColor: theme.colors.backgroundColor,
		color: theme.colors.color,
		display: "grid",
		gridTemplateColumns: "1fr 5fr",
		gridTemplateRows: "auto 1fr auto",
		height: "100vh"
	},

	header: {
		gridColumn: "1/3",
		gridRow: "1/2"
	},

	footer: {
		gridColumn: "1/3",
		gridRow: "3/4"
	},

	explorer: {
		gridColumn: "1/2",
		gridRow: "2/3"
	},

	content: {
		gridColumn: "2/3",
		gridRow: "2/3"
	}
});
//#endregion

//#region Start (View)
export const Start: React.FC = props => {
	const classes = useTheme(themedClasses);
	const { selectedCircuitId } = useUIStore(store => ({
		selectedCircuitId: get(store.state.selectedCircuitId)
	}));
	const { project } = useDataStore(store => ({
		project: get(store.state.project)
	}));
	const currentBoard: LogicalCircuit = project.categories.reduce<LogicalCircuit | undefined>((acc, cur) =>
		acc || cur.circuits.find(circuit => circuit.id === selectedCircuitId),
		undefined) || orThrow("Circuit not found: " + selectedCircuitId);

	return (
		<div className={ classes.start }>
			<Explorer />
			<Board className={ classes.content } circuit={ currentBoard }></Board>
			<MenuBar className={ classes.header } />
			<StatusBar className={ classes.footer } />
		</div>
	);
};
//#endregion
