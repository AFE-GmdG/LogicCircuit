import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

import { LogicalCircuit } from "../store/model/logicalProject";

//#region Constants
const themedClasses = (theme: Theme) => ({
	circuit: {
		display: "block",
		margin: "0.5rem",
		padding: "0.5rem",
		border: theme.border.thin,
		borderRadius: "0.2rem"
	}
});
//#endregion

//#region Circuit
type RenderMode = "Chip" | "Preview" | "Full";

type CircuitProps = {
	className?: string;
	mode: RenderMode;
	circuit: LogicalCircuit;
};

export const Circuit: React.FC<CircuitProps> = props => {
	const { className, circuit } = props;
	const classes = useTheme(themedClasses);

	return (
		<div className={ classNames(className, classes.circuit) }>
			<div>{ circuit.name }</div>
		</div>
	);
};
//#endregion
