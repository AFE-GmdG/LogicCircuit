import * as React from "react";
import { create, RulesDef, StyleSheet, StyleSheetOptions } from "jss";
import preset from "jss-preset-default";
import vendorPrefix from "jss-plugin-vendor-prefixer";

import { Theme, defaultTheme } from "./theme";

const jss = create(preset({ vendorPrefixer: vendorPrefix() }));

const themeContext = React.createContext<Theme>(defaultTheme);

type ThemeProviderProps = {
	theme?: Theme;
};

type StyleFunction = (theme: Theme) => RulesDef;

const styleCache = new Map<StyleFunction, [StyleSheet, any]>();
let currentTheme: Theme;

export function useTheme(): Theme;
export function useTheme<T extends StyleFunction>(styleFunction: T, options?: StyleSheetOptions): Record<keyof ReturnType<typeof styleFunction>, string>;
export function useTheme<T extends StyleFunction>(styleFunction?: T, options?: StyleSheetOptions) {
	const theme = React.useContext(themeContext);
	if (!styleFunction) {
		return theme;
	}

	if (theme !== currentTheme) {
		// clear Cache, set new current theme
		styleCache.forEach(([styleSheet]) => styleSheet && jss.removeStyleSheet(styleSheet));
		styleCache.clear();
		currentTheme = theme;
	};

	let [styleSheet, classes] = styleCache.get(styleFunction) || [undefined, undefined];

	if (!styleSheet) {
		const styleObject = styleFunction(theme);
		styleSheet = jss.createStyleSheet(styleObject, options);
		classes = styleSheet.attach().classes;
		styleCache.set(styleFunction, [styleSheet, classes]);
	}

	return classes;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = props => React.createElement(themeContext.Provider, { value: props.theme || defaultTheme }, props.children);
