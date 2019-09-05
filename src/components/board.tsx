import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

import { LogicalCircuit } from "../store/model/logicalCircuit";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	board: {
		position: "relative",
		backgroundColor: theme.colors.backgroundColor
	},

	scrollContainer: {
		position: "absolute",
		top: "1rem",
		left: "1rem",
		width: "calc(100% - 2rem)",
		height: "calc(100% - 2rem)",
		borderRadius: "6px",
		overflow: "scroll",
		boxShadow: theme.box.thinShadow
	},

	canvas: {
		width: "4096px"
	},

	debugLine: {
		stroke: "hsla(0, 100%, 50%, 0.5)",
		strokeWidth: "1px",
		fill: theme.svg.none
	}
});
//#endregion

//#region Typen
type BoardProps = {
	className?: string;
	circuit: LogicalCircuit;
}
//#endregion

//region Circuit
export const Board: React.FC<BoardProps> = props => {
	const { className, circuit } = props;
	const classes = useTheme(themedClasses);

	return (
		<div className={ classNames(className, classes.board) }>
			<div className={ classes.scrollContainer }>
				<svg className={ classes.canvas } viewBox="0 0 4096 4096">
					<rect className={ classes.debugLine }
						x1={ 0 } y1={ 0 } width={ 4096 } height={ 4096 }
					/>
				</svg>
			</div>
		</div>
	);
};
//#endregion
