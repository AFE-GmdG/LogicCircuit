import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

import { GatterType } from "../store/model/gatter";

import { InputPinCount, InputPinCountEditor } from "./editors";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	icon: {
		flex: "0 0 4rem"
	},

	thinLines: {
		stroke: theme.svg.stroke,
		strokeWidth: theme.svg.strokeWidthThin
	},

	mediumLines: {
		stroke: theme.svg.stroke,
		strokeWidth: theme.svg.strokeWidthMedium
	},

	blackFill: {
		fill: theme.svg.fillBlack
	},

	lightFill: {
		fill: theme.svg.fillLight
	},

	whiteFill: {
		fill: theme.svg.fillWhite
	},

	noFill: {
		fill: theme.svg.none
	},

	itemEditorContainer: {
		flex: "0 0 10rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		padding: "0 0 0 0.4rem"
	},

	itemName: {
		flex: "1 0 0px",
		overflow: "hidden",
		maxHeight: "6rem",
		padding: "0 0 0 0.4rem"
	}
});
//#endregion

//#region Gatter Item
export type GatterItemProps = {
	gatterType: GatterType;
	isTemplateItem: boolean;
};

export const GatterItem: React.FC<GatterItemProps> = props => {
	const { gatterType, isTemplateItem } = props;
	const classes = useTheme(themedClasses);

	const [inputPinCount, setInputPinCount] = React.useState(InputPinCount["2 Pins"]);

	if (isTemplateItem) {
		switch (gatterType) {
			case "Not":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={5} cy={30} r={2} />
							<polygon className={ classNames(classes.thinLines, classes.whiteFill) }
								points="35,30 5,48 5,12" />
							<circle className={ classNames(classes.thinLines, classes.whiteFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
						</svg>
						<div className={ classes.itemEditorContainer }></div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "And":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 5,12 L 20,12 A 15,18 0 0 1 20,48 L 5,48 Z"
							/>
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "Nand":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 5,12 L 20,12 A 15,18 0 0 1 20,48 L 5,48 Z"
							/>
							<circle className={ classNames(classes.thinLines, classes.whiteFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "Or":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 5,16 A 30,27 0 0 1 35,30 A 30,27 0 0 1 5,44 A 30,36 0 0 0 5,16 Z"
							/>
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "Nor":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 5,16 A 30,27 0 0 1 35,30 A 30,27 0 0 1 5,44 A 30,36 0 0 0 5,16 Z"
							/>
							<circle className={ classNames(classes.thinLines, classes.whiteFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "Xor":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 8,16 A 29,27 0 0 1 35,30 A 29,27 0 0 1 8,44 A 30,36 0 0 0 8,16 Z"
							/>
							<path className={ classNames(classes.thinLines, classes.noFill) }
								d="M 5,15 A 30,36 0 0 1 5,45"
							/>
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
			case "Xnor":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 20 } r={ 2 } />
							<circle className={ classNames(classes.thinLines, classes.blackFill) }
								cx={ 5 } cy={ 40 } r={ 2 } />
							<path className={ classNames(classes.thinLines, classes.whiteFill) }
								d="M 8,16 A 29,27 0 0 1 35,30 A 29,27 0 0 1 8,44 A 30,36 0 0 0 8,16 Z"
							/>
							<path className={ classNames(classes.thinLines, classes.noFill) }
								d="M 5,15 A 30,36 0 0 1 5,45"
							/>
							<circle className={ classNames(classes.thinLines, classes.whiteFill) }
								cx={ 35 } cy={ 30 } r={ 2 } />
						</svg>
						<div className={ classes.itemEditorContainer }>
							<InputPinCountEditor pinCount={ inputPinCount } onChange={ setInputPinCount } />
						</div>
						<div className={ classes.itemName }>{ gatterType }</div>
					</>
				);
		}
	}

	return null;
};
//#endregion
