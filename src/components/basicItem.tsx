import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

//#region Konstanten
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

	itemEditor: {
		height: theme.fonts.lineHeightMedium,
		lineHeight: theme.fonts.lineHeightMedium,
		margin: "0 0 1px 0"
	},

	itemEditorLabel: {
		display: "inline-block",
		width: "4.6rem",
		height: theme.fonts.lineHeightMedium,
		lineHeight: theme.fonts.lineHeightMedium,
		textAlign: "right",
		margin: "0 0.4rem 0 0"
	},

	itemEditorSelect: {
		width: "5rem",
		height: theme.fonts.lineHeightMedium,
		lineHeight: theme.fonts.lineHeightMedium,
		boxSizing: "border-box",
		border: theme.border.thin,
		margin: 0,
		padding: 0,
		outline: "none"
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
							<PinEditor side={ pinSide } onChange={ setPinSide } />
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
							<PinEditor side={ pinSide } onChange={ setPinSide } />
						</div>
						<div className={ classes.itemName }>{ type }</div>
					</>
				)
		}
	}

	return null;
};
//#endregion

//#region Editors
enum BitWidth {
	"1 Bit" = 1,
	"2 Bit" = 2,
	"3 Bit" = 3,
	"4 Bit" = 4,
	"5 Bit" = 5,
	"6 Bit" = 6,
	"7 Bit" = 7,
	"8 Bit" = 8,
	"9 Bit" = 9,
	"10 Bit" = 10,
	"11 Bit" = 11,
	"12 Bit" = 12,
	"13 Bit" = 13,
	"14 Bit" = 14,
	"15 Bit" = 15,
	"16 Bit" = 16
}

type BitWidthEditorProps = {
	bitWidth: BitWidth;
	onChange: (bitWidth: BitWidth) => void;
};

const BitWidthEditor: React.FC<BitWidthEditorProps> = props => {
	const { bitWidth, onChange } = props;
	const classes = useTheme(themedClasses);

	return (
		<label className={ classes.itemEditor }>
			<span className={ classes.itemEditorLabel }>Bit Width</span>
			<select className={ classes.itemEditorSelect } value={ bitWidth } onChange={ event => {
				onChange && onChange(parseInt(event.currentTarget.value));
				event.stopPropagation();
			} }>
				<option value={ BitWidth["1 Bit"] }>{ BitWidth[BitWidth["1 Bit"]] }</option>
				<option value={ BitWidth["2 Bit"] }>{ BitWidth[BitWidth["2 Bit"]] }</option>
				<option value={ BitWidth["3 Bit"] }>{ BitWidth[BitWidth["3 Bit"]] }</option>
				<option value={ BitWidth["4 Bit"] }>{ BitWidth[BitWidth["4 Bit"]] }</option>
				<option value={ BitWidth["5 Bit"] }>{ BitWidth[BitWidth["5 Bit"]] }</option>
				<option value={ BitWidth["6 Bit"] }>{ BitWidth[BitWidth["6 Bit"]] }</option>
				<option value={ BitWidth["7 Bit"] }>{ BitWidth[BitWidth["7 Bit"]] }</option>
				<option value={ BitWidth["8 Bit"] }>{ BitWidth[BitWidth["8 Bit"]] }</option>
				<option value={ BitWidth["9 Bit"] }>{ BitWidth[BitWidth["9 Bit"]] }</option>
				<option value={ BitWidth["10 Bit"] }>{ BitWidth[BitWidth["10 Bit"]] }</option>
				<option value={ BitWidth["11 Bit"] }>{ BitWidth[BitWidth["11 Bit"]] }</option>
				<option value={ BitWidth["12 Bit"] }>{ BitWidth[BitWidth["12 Bit"]] }</option>
				<option value={ BitWidth["13 Bit"] }>{ BitWidth[BitWidth["13 Bit"]] }</option>
				<option value={ BitWidth["14 Bit"] }>{ BitWidth[BitWidth["14 Bit"]] }</option>
				<option value={ BitWidth["15 Bit"] }>{ BitWidth[BitWidth["15 Bit"]] }</option>
				<option value={ BitWidth["16 Bit"] }>{ BitWidth[BitWidth["16 Bit"]] }</option>
			</select>
		</label>
	);
};

enum PinSide {
	Left,
	Top,
	Right,
	Bottom
}

type PinEditorProps = {
	side: PinSide;
	onChange: (side: PinSide) => void;
};

const PinEditor: React.FC<PinEditorProps> = props => {
	const { side, onChange } = props;
	const classes = useTheme(themedClasses);

	return (
		<label className={ classes.itemEditor }>
			<span className={ classes.itemEditorLabel }>Pin Side</span>
			<select className={ classes.itemEditorSelect } value={ side } onChange={ event => {
				onChange && onChange(parseInt(event.currentTarget.value));
				event.stopPropagation();
			} }>
				<option value={ PinSide.Left }>{ PinSide[PinSide.Left] }</option>
				<option value={ PinSide.Top }>{ PinSide[PinSide.Top] }</option>
				<option value={ PinSide.Right }>{ PinSide[PinSide.Right] }</option>
				<option value={ PinSide.Bottom }>{ PinSide[PinSide.Bottom] }</option>
			</select>
		</label>
	);
};
//#endregion
