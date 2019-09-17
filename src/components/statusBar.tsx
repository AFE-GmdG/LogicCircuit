import * as React from "react";
import { get } from "@easm/core";

import { Theme, useTheme, classNames } from "../themes";
import { useUIStore } from "../store";

import { setZoomAction } from "../store/model/logicalProject";
import { Zoom } from "../store/model/types";

//#region Constants
const themedClasses = (theme: Theme) => ({
	statusBar: {
		position: "relative",
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "stretch",
		margin: 0,
		padding: "0.2rem 0.5rem 0.2rem",
		listStyle: "none",
		backgroundColor: theme.colors.gentleAccentBackgroundColor,
		boxShadow: theme.box.shadow
	},

	statusItem: {
		flex: "0 0 auto"
	},

	zoomItem: {
		flex: "0 0 auto",
		marginLeft: "auto"
	},

	label: {
		display: "inline-block",
		margin: "0 0.5rem 0 0"
	},

	dropdown: {
		display: "inline-block",
		height: theme.fonts.lineHeightLarge,
		margin: "1px 0 0 0",
		border: theme.border.thin
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
	function onZoomChange(event: React.ChangeEvent<HTMLSelectElement>) {
		setZoomAction(Number.parseFloat(event.currentTarget.value));
		event.stopPropagation();
	}

	const { className } = props;
	const classes = useTheme(themedClasses);
	const { zoom } = useUIStore(store => ({
		zoom: get(store.state.zoom)
	}));

	return (
		<ul className={ classNames(className, classes.statusBar) }>
			<li className={ classes.statusItem }>StatusBar</li>
			<li className={ classes.zoomItem }>
				<span className={ classes.label }>Zoom:</span>
				<select className={ classes.dropdown } value={ zoom } onChange={ onZoomChange }>
					<option value={ Zoom["25%"] }>{ Zoom[Zoom["25%"]] }</option>
					<option value={ Zoom["50%"] }>{ Zoom[Zoom["50%"]] }</option>
					<option value={ Zoom["75%"] }>{ Zoom[Zoom["75%"]] }</option>
					<option value={ Zoom["100%"] }>{ Zoom[Zoom["100%"]] }</option>
					<option value={ Zoom["125%"] }>{ Zoom[Zoom["125%"]] }</option>
					<option value={ Zoom["150%"] }>{ Zoom[Zoom["150%"]] }</option>
					<option value={ Zoom["175%"] }>{ Zoom[Zoom["175%"]] }</option>
					<option value={ Zoom["200%"] }>{ Zoom[Zoom["200%"]] }</option>
				</select>
			</li>
		</ul>
	);
};
//#endregion
