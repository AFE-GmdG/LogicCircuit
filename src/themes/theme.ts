//#region DefaultTheme
export const defaultTheme = {
	fonts: {
		fontFamily: "Hind",
		fontWeight: "400",
		fontSizeSmall: "12px",
		fontSizeMedium: "14px",
		fontSizeLarge: "16px",
		fontSizeXLarge: "20px",
		lineHeightSmapp: "16px",
		lineHeightMedium: "19px",
		lineHeightLarge: "21px"
	},

	colors: {
		color: "hsl(0, 0%, 18%)",
		hoverColor: "hsl(0, 0%, 12%)",
		accentColor: "hsl(163, 80%, 40%)",
		gentleAccentColor: "hsl(163, 80%, 25%)",
		grayedOutColor: "hsl(0, 0%, 55%)",

		backgroundColor: "hsl(0, 0%, 100%)",
		hoverBackgroundColor: "hsl(0, 0%, 85%)",
		accentBackgroundColor: "hsl(163, 80%, 25%)",
		gentleAccentBackgroundColor: "hsl(163, 80%, 40%)",
		selectedBackgroundColor: "hsl(163, 60%, 25%)"
	},

	border: {
		thin: "1px solid hsl(0, 0%, 18%)",
		splitter: "3px solid hsl(163, 80%, 40%)"
	},

	box: {
		shadow: "0 0 2rem 0 hsla(0, 0%, 0%, 0.5)",
		thinShadow: "0 0 1rem 0 hsla(0, 0%, 0%, 0.5)"
	},

	svg: {
		stroke: "hsl(0, 0%, 0%)",
		strokeWidthThin: "1px",
		strokeWidthMedium: "3px",

		fillBlack: "hsl(0, 0%, 0%)",
		fillLight: "hsl(0, 0%, 90%)",
		fillWhite: "hsl(0, 0%, 100%)",
		none: "none"
	}
};
//#endregion

//#region Types
export type Theme = typeof defaultTheme;
type Condition = boolean | (() => boolean);
type ClassName = string | { [key: string]: Condition } | undefined;
//#endregion

//#region Methods
export function conditionalClassName(className: string, condition: Condition) {
	return (typeof condition === "boolean" ? condition : condition()) ? className : "";
}

export function classNames(...classNames: ClassName[]) {
	return classNames.reduce<string[]>((classNames, className) => {
		if (className === undefined) {
			return classNames;
		} else if (typeof className === "string") {
			const trimmedClassName = className.trim();
			if (trimmedClassName.length > 0) {
				classNames.push(trimmedClassName);
			}
		} else {
			for (const propertyName in className) {
				const property = className[propertyName];
				const shouldAddThisClassName = typeof property === "boolean"
					? property
					: property();
				if (shouldAddThisClassName) {
					const trimmedClassName = propertyName.trim();
					if (trimmedClassName.length > 0) {
						classNames.push(trimmedClassName);
					}
				}
			}
		}
		return classNames;
	}, []).join(" ");
}
//#endregion
