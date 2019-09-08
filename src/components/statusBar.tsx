import * as React from "react";
import { Theme, useTheme, classNames } from "../themes";

//#region Constants
const themedClasses = (theme: Theme) => ({
	statusBar: {
		position: "relative",
		margin: 0,
		padding: "0.2rem 0.5rem 0.2rem",
		backgroundColor: theme.colors.gentleAccentBackgroundColor,
		boxShadow: theme.box.shadow
	}
});
//#endregion

//#region Types
type StatusBarProps = {
	className?: string;
}
//#endregion

//#region StatusBar
export const StatusBar: React.FC<StatusBarProps> = props => {
	const { className } = props;
	const classes = useTheme(themedClasses);

	return (
		<footer className={ classNames(className, classes.statusBar) }>
			StatusBar
		</footer>
	);
};
//#endregion
