import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

import { LogicalCircuit } from "../store/model/logicalCircuit";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	zoom25: {},
	zoom50: {},
	zoom150: {},
	zoom200: {},

	board: {
		position: "relative",
		backgroundColor: theme.colors.backgroundColor
	},

	scrollContainer: {
		position: "absolute",
		top: "1rem",
		right: "1rem",
		left: "1rem",
		maxHeight: "calc(100% - 2rem)",
		borderRadius: "6px",
		overflow: "auto",
		boxShadow: theme.box.thinShadow
	},

	canvas: {
		width: "4096px",
		margin: "0 auto",

		"&$zoom25": {
			width: "1024px",

			"& $boardBackgroundPattern": {
				fill: "url(#board-background-pattern-x4)"
			}
		},

		"&$zoom50": {
			width: "2048px",

			"& $boardBackgroundPattern": {
				fill: "url(#board-background-pattern-x2)"
			}
		},

		"&$zoom150": {
			width: "6140px"
		},

		"&$zoom200": {
			width: "8192px"
		}
	},

	boardBackgroundPattern: {
		fill: "url(#board-background-pattern)"
	},

	debugLine: {
		stroke: "hsla(0, 100%, 50%, 0.5)",
		strokeWidth: "1px"
	}
});
//#endregion

//#region Typen
type BoardProps = {
	className?: string;
	circuit: LogicalCircuit;
}
//#endregion

//#region Circuit
export const Board: React.FC<BoardProps> = props => {
	const { className, circuit } = props;
	const classes = useTheme(themedClasses);

	return (
		<div className={ classNames(className, classes.board) }>
			<div className={ classes.scrollContainer }>
				<svg className={ classNames(classes.canvas) } viewBox="0 0 4096 4096">
					<rect className={ classes.boardBackgroundPattern }
						x1={ 0 } y1={ 0 } width={ 4096 } height={ 4096 }
					/>
				</svg>
			</div>
		</div>
	);
};
//#endregion
