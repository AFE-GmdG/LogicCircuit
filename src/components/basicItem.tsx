import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

import { BitWidth, BitWidthEditor, PinSide, PinSideEditor } from "./editors";

//#region Constants
const themedClasses = (theme: Theme) => ({
	icon: {
		flex: "0 0 4rem"
	},

	textNoteText1: {
		fontSize: theme.fonts.fontSizeLarge,
		fontWeight: "bold",
		fontFamily: "serif",
		textAnchor: "middle"
	},

	textNoteText2: {
		fontSize: theme.fonts.fontSizeMedium,
		fontFamily: "Hind",
		fontStyle: "italic",
		textAnchor: "middle"
	},

	thinLines: {
		stroke: theme.svg.stroke,
		strokeWidth: theme.svg.strokeWidthThin
	},

	mediumLines: {
		stroke: theme.svg.stroke,
		strokeWidth: theme.svg.strokeWidthMedium
	},

	lightFill: {
		fill: theme.svg.fillLight
	},

	whiteFill: {
		fill: theme.svg.fillWhite
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

//#region Basic Item
export type BasicItemType = "Text Note" | "Pin" | "Button" | "Constant" | "Splitter" | "LED" | "LED Matrix" | "Graphics Array" | "Probe";

type BasicItemProps = {
	type: BasicItemType;
	isTemplateItem: boolean;
};

export const BasicItem: React.FC<BasicItemProps> = props => {
	const { type, isTemplateItem } = props;
	const classes = useTheme(themedClasses);

	const [pinSide, setPinSide] = React.useState(PinSide.Left);
	const [bitWidth, setBitWidth] = React.useState(BitWidth["1 Bit"]);

	if (isTemplateItem) {
		switch (type) {
			case "Text Note":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 60">
							<text className={ classes.textNoteText1 } x={ 20 } y={ 25 }>Text</text>
							<text className={ classes.textNoteText2 } x={ 20 } y={ 45 }>Note</text>
						</svg>
						<div className={ classes.itemEditorContainer }></div>
						<div className={ classes.itemName }>{ type }</div>
					</>
				);
			case "Pin":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 40">
							<rect className={ classNames(classes.thinLines, classes.lightFill) } x={ 10 } y={ 10 } width={ 20 } height={ 20 } rx={ 4 } />
							<circle className={ classNames(classes.thinLines, classes.whiteFill) } cx={ 20 } cy={ 20 } r={ 3 } />
						</svg>
						<div className={ classes.itemEditorContainer }>
							<BitWidthEditor bitWidth={ bitWidth } onChange={ setBitWidth } />
							<PinSideEditor side={ pinSide } onChange={ setPinSide } />
						</div>
						<div className={ classes.itemName }>{ type }</div>
					</>
				);
			case "Button":
				return (
					<>
						<svg className={ classes.icon } viewBox="0 0 40 40">
							<rect className={ classNames(classes.thinLines, classes.lightFill) } x={ 10 } y={ 10 } width={ 20 } height={ 20 } rx={ 4 } />
						</svg>
						<div className={ classes.itemEditorContainer }>
							<PinSideEditor side={ pinSide } onChange={ setPinSide } />
						</div>
						<div className={ classes.itemName }>{ type }</div>
					</>
				)
		}
	}

	return null;
};
//#endregion
