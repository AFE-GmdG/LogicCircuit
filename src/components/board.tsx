import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";
import { FileSystemEntry } from "../common/dragDropFileSystem";

import { LogicalCircuit, Zoom } from "../store/model/types";

//#region Constants
const themedClasses = (theme: Theme) => ({
	zoom25: {},
	zoom50: {},
	zoom75: {},
	zoom100: {},
	zoom125: {},
	zoom150: {},
	zoom175: {},
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

		"&$zoom75": {
			width: "3072px",

			"& $boardBackgroundPattern": {
				fill: "url(#board-background-pattern-x2)"
			}
		},

		"&$zoom100": {
			width: "4096px",

			"& $boardBackgroundPattern": {
				fill: "url(#board-background-pattern-x2)"
			}
		},

		"&$zoom125": {
			width: "5120px"
		},

		"&$zoom150": {
			width: "6140px"
		},

		"&$zoom175": {
			width: "7168px"
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

//#region Types
type BoardProps = {
	className?: string;
	circuit: LogicalCircuit;
	zoom: Zoom;
}

type Position = {
	x: number;
	y: number;
};
//#endregion

//#region Circuit
export const Board: React.FC<BoardProps> = props => {
	function onDragEnter(event: React.DragEvent<SVGSVGElement>) {
		try {
			const { clientX, clientY, currentTarget, dataTransfer } = event;
			const gatterType = dataTransfer.types.find(type => type.indexOf("gatter:") === 0);
			if (!gatterType) {
				dataTransfer.dropEffect = "none";
				event.preventDefault();
				return;
			}
			const { left, top } = currentTarget.getBoundingClientRect();
			dragDropMousePosition = {
				x: (clientX - left) / zoom,
				y: (clientY - top) / zoom
			};
		} catch (ex) {
			console.error("onDragEnter", ex);
		} finally {
			event.stopPropagation();
		}
	}

	function onDragOver(event: React.DragEvent<SVGSVGElement>) {
		try {
			const { clientX, clientY, dataTransfer } = event;
			if (dataTransfer.types.includes("Files")) {
				dataTransfer.dropEffect = "copy";
				event.preventDefault();
				return;
			}

			const gatterType = dataTransfer.types.find(type => type.indexOf("gatter:") === 0)
			if (!gatterType) {
				return;
			}

			dataTransfer.dropEffect = "copy";
			event.preventDefault();
		} catch (ex) {
			console.error("onDragOver", ex);
		} finally {
			event.stopPropagation();
		}
	}

	function onDragLeave(event: React.DragEvent<SVGSVGElement>) {
		try {
			console.log("onDragLeave");

		} catch (ex) {
			console.error("onDragLeave", ex);
		} finally {
			event.stopPropagation();
		}
	}

	function onDrop(event: React.DragEvent<SVGSVGElement>) {
		try {
			const { clientX, clientY, dataTransfer } = event;
			if (dataTransfer.types.includes("Files")) {
				try {
					for (let i = 0; i < dataTransfer.items.length; ++i) {
						const item = dataTransfer.items[i] as DataTransferItem & {
							getAsEntry(): FileSystemEntry;
							webkitGetAsEntry(): FileSystemEntry;
						};
						if (item.kind !== "file") {
							continue;
						}
						const getAsEntry = item.getAsEntry || item.webkitGetAsEntry
						const entry: FileSystemEntry = getAsEntry.apply(item);
						if (entry.isDirectory) {
							const reader = entry.createReader();
							reader.readEntries(entries => {
								entries.forEach(entry => {
									console.log(entry);
								});
							});
						}
					}
				} catch (ex) {
					console.error("onDrop", ex);
				}
				event.preventDefault();
				return;
			}

			console.log("onDrop");
			event.preventDefault();
		} catch (ex) {
			console.error("onDrop", ex);
		} finally {
			event.stopPropagation();
		}
	}

	const { className, circuit, zoom } = props;
	const classes = useTheme(themedClasses);
	const canvasRef = React.useRef<SVGSVGElement>(null);
	let dragDropMousePosition: Position | null = null;
	let dragDropGroup: SVGGElement | null = null;

	const zoomClass = zoom === Zoom["25%"]
		? classes.zoom25
		: zoom === Zoom["50%"]
			? classes.zoom50
			: zoom === Zoom["75%"]
				? classes.zoom75
				: zoom === Zoom["100%"]
					? classes.zoom100
					: zoom === Zoom["125%"]
						? classes.zoom125
						: zoom === Zoom["150%"]
							? classes.zoom150
							: zoom === Zoom["175%"]
								? classes.zoom175
								: classes.zoom200;

	return (
		<div className={ classNames(className, classes.board) }>
			<div className={ classes.scrollContainer }>
				<svg ref={ canvasRef }
					className={ classNames(classes.canvas, zoomClass) }
					viewBox="0 0 4096 4096"
					onDragEnter={ onDragEnter }
					onDragOver={ onDragOver }
					onDragLeave={ onDragLeave }
					onDrop={ onDrop }>
					<rect className={ classes.boardBackgroundPattern }
						x1={ 0 } y1={ 0 } width={ 4096 } height={ 4096 }
					/>
				</svg>
			</div>
		</div>
	);
};
//#endregion
