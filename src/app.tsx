import * as React from "react";
import { render } from "react-dom";

import { Theme, ThemeProvider, useTheme } from "./themes"
import { Start } from "./views";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	"@global": {
		html: {
			color: theme.colors.color,
			backgroundColor: theme.colors.backgroundColor,
			fontFamily: theme.fonts.fontFamily,
			fontSize: theme.fonts.fontSizeMedium,
			fontWeight: theme.fonts.fontWeight
		},

		body: {
			fontFamily: theme.fonts.fontFamily
		},

		h1: {
			padding: "12px 0 6px 0",
			margin: 0,
			fontSize: theme.fonts.fontSizeXLarge,
		},

		h2: {
			padding: "12px 0 6px 0",
			margin: 0,
			fontSize: theme.fonts.fontSizeLarge,
		},

		label: {
			cursor: "pointer",
			clear: "both"
		},

		a: {
			backgroundColor: "transparent",
			textDecoration: "none",

			"&:link": {
				color: theme.colors.accentColor
			},

			"&:visited": {
				color: theme.colors.accentColor
			},

			"&:active": {
				color: theme.colors.hoverColor,
				textDecoration: "underline"
			},

			"&:hover": {
				color: theme.colors.hoverColor,
				textDecoration: "underline"
			}
		}
	}
});
//#endregion


const App: React.FC = props => {
	// Apply the global css styles.
	useTheme(themedClasses);

	return <Start />;
};

render(
	<ThemeProvider>
		<App />
	</ThemeProvider>,
	document.getElementById("app")
);
