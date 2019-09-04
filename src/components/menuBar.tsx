import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	menuBar: {
		position: "relative",
		margin: 0,
		padding: "0.3rem 0.5rem 0.2rem",
		backgroundColor: theme.colors.gentleAccentBackgroundColor,
		fontSize: theme.fonts.fontSizeLarge,
		boxShadow: theme.box.shadow
	}
});
//#endregion

//#region Typen
type MenuBarProps = {
	className?: string;
}
//#endregion

//#region MenuBar
export const MenuBar: React.FC<MenuBarProps> = props => {
	const { className } = props;
	const classes = useTheme(themedClasses);

	return (
		<header className={ classNames(className, classes.menuBar) }>
			MenuBar
		</header>
	);
};
//#endregion
