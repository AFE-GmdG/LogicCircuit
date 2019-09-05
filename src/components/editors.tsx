import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
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
	}
});
//#endregion

//#region BitWidth
export enum BitWidth {
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

export const BitWidthEditor: React.FC<BitWidthEditorProps> = props => {
	const { bitWidth, onChange } = props;
	const classes = useTheme(themedClasses);

	return (
		<label className={ classes.itemEditor }>
			<span className={ classes.itemEditorLabel }>Bit Width</span>
			<select className={ classes.itemEditorSelect } value={ bitWidth } onChange={ event => {
				onChange(parseInt(event.currentTarget.value));
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
//#endregion

//#region InputPinCount
export enum InputPinCount {
	"2 Pins" = 2,
	"3 Pins" = 3,
	"4 Pins" = 4,
	"5 Pins" = 5,
	"6 Pins" = 6,
	"7 Pins" = 7,
	"8 Pins" = 8
}

type InputPinCountEditorProps = {
	pinCount: InputPinCount;
	onChange: (pinCount: InputPinCount) => void;
};

export const InputPinCountEditor: React.FC<InputPinCountEditorProps> = props => {
	const { pinCount, onChange } = props;
	const classes = useTheme(themedClasses);

	return (
		<label className={ classes.itemEditor }>
			<span className={ classes.itemEditorLabel }>Input Bits</span>
			<select className={ classes.itemEditorSelect } value={ pinCount } onChange={ event => {
				onChange(parseInt(event.currentTarget.value));
				event.stopPropagation();
			} }>
				<option value={ InputPinCount["2 Pins"] }>{ InputPinCount[InputPinCount["2 Pins"]] }</option>
				<option value={ InputPinCount["3 Pins"] }>{ InputPinCount[InputPinCount["3 Pins"]] }</option>
				<option value={ InputPinCount["4 Pins"] }>{ InputPinCount[InputPinCount["4 Pins"]] }</option>
				<option value={ InputPinCount["5 Pins"] }>{ InputPinCount[InputPinCount["5 Pins"]] }</option>
				<option value={ InputPinCount["6 Pins"] }>{ InputPinCount[InputPinCount["6 Pins"]] }</option>
				<option value={ InputPinCount["7 Pins"] }>{ InputPinCount[InputPinCount["7 Pins"]] }</option>
				<option value={ InputPinCount["8 Pins"] }>{ InputPinCount[InputPinCount["8 Pins"]] }</option>
			</select>
		</label>
	)
};
//#endregion

//#region PinSide
export enum PinSide {
	Left,
	Top,
	Right,
	Bottom
}

type PinSideEditorProps = {
	side: PinSide;
	onChange: (side: PinSide) => void;
};

export const PinSideEditor: React.FC<PinSideEditorProps> = props => {
	const { side, onChange } = props;
	const classes = useTheme(themedClasses);

	return (
		<label className={ classes.itemEditor }>
			<span className={ classes.itemEditorLabel }>Pin Side</span>
			<select className={ classes.itemEditorSelect } value={ side } onChange={ event => {
				onChange(parseInt(event.currentTarget.value));
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
