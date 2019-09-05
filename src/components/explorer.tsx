import * as React from "react";
import { get } from "@easm/core";

import { Theme, useTheme, classNames, conditionalClassName } from "../themes";
import { useDataStore } from "../store";
import { GatterType } from "../store/model/gatter";
import { LogicalCircuit } from "../store/model/logicalCircuit";

import { BasicItem, BasicItemType } from "./basicItem";
import { Circuit } from "./circuit";
import { GatterItem } from "./gatterItem";

//#region Konstanten
const themedClasses = (theme: Theme) => ({
	expanded: {},

	explorer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		backgroundColor: theme.colors.backgroundColor,
		color: theme.colors.color,
		margin: 0,
		padding: 0,
		borderRight: theme.border.splitter,
		listStyle: "none",
		overflow: "auto"
	},

	section: {
		flex: "0 0 auto",
		margin: 0,
		padding: 0,

		"&:last-child": {
			borderBottom: theme.border.thin
		}
	},

	header: {
		position: "relative",
		backgroundColor: theme.colors.gentleAccentBackgroundColor,
		borderTop: theme.border.thin,
		borderRight: theme.border.thin,
		borderLeft: theme.border.thin,
		padding: "0.1rem 0.4rem 0.1rem 1.6rem",
		fontWeight: "bold",
		cursor: "pointer",

		"&::before": {
			content: "'\\f105'",
			position: "absolute",
			top: "0.2rem",
			left: "0.2rem",
			width: "1em",
			fontFamily: "'Font Awesome 5 Free'",
			fontWeight: 900,
			fontSize: "1.2em",
			textAlign: "center"

		},

		"&$expanded": {
			"&::before": {
				content: "'\\f107'"
			}
		}
	},

	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		borderTop: theme.border.thin,
		borderRight: theme.border.thin,
		borderLeft: theme.border.thin,
		margin: 0,
		padding: 0,
		listStyle: "none"
	},

	item: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: "0.1rem",
		padding: "0.4rem",
		border: "0 none",

		"&:hover": {
			backgroundColor: theme.colors.hoverBackgroundColor
		}
	}
});

const gatterItems: GatterExplorerItemProps[] = [
	{ name: "Not", gatterType: "Not" },
	{ name: "And", gatterType: "And" },
	{ name: "NAnd", gatterType: "Nand" },
	{ name: "Or", gatterType: "Or" },
	{ name: "NOr", gatterType: "Nor" },
	{ name: "XOr", gatterType: "Xor" },
	{ name: "XNor", gatterType: "Xnor" }
];
//#endregion

//#region Explorer
type ExplorerProps = {
	className?: string;
};

type Section = {
	category: string | null;
	label: string;
	isExpanded: boolean;
};

export const Explorer: React.FC<ExplorerProps> = props => {
	function expandOrCollapseSection(event: React.MouseEvent<HTMLDivElement, MouseEvent>, section: Section) {
		const index = sections.indexOf(section);
		setSections(sections.slice(0, index).concat(
			[{ ...section, isExpanded: !section.isExpanded }],
			sections.slice(index + 1)
		));
		event.stopPropagation();
	}

	function expandOrCollapseDefaultSectionSection(event: React.MouseEvent<HTMLDivElement, MouseEvent>, defaultSection: keyof typeof defaultSectionsExpandedState) {
		setDefaultSectionsExpandedState({ ...defaultSectionsExpandedState, [defaultSection]: !defaultSectionsExpandedState[defaultSection] });
		event.stopPropagation();
	}

	const { className } = props;
	const classes = useTheme(themedClasses);
	const { circuits } = useDataStore(store => ({
		circuits: get(store.state.circuits)
	}));

	const [sections, setSections] = React.useState<Section[]>(Array.from(
		circuits.reduce((acc, circuit) => acc.add(circuit.category), new Set<string | null>([null])),
		(item, index) => ({
			category: item,
			label: item || "Circuit Project",
			isExpanded: index === 0
		})
	));
	const [defaultSectionsExpandedState, setDefaultSectionsExpandedState] = React.useState({
		textNoteSection: false,
		inputOutputSection: false,
		primitivesSection: false
	});

	return (
		<ul className={ classNames(className, classes.explorer) }>
			{ sections.map(section => (
				<li key={ section.category || 0 } className={ classes.section }>
					<div className={ classNames(classes.header, conditionalClassName(classes.expanded, section.isExpanded)) }
						onClick={ event => expandOrCollapseSection(event, section) }>
						{ section.label }
					</div>
					{
						section.isExpanded && (
							<ul className={ classes.content }>
								{
									circuits
										.filter(circuit => circuit.category === section.category)
										.map(circuit => (
											<ExplorerItem key={ circuit.id } circuit={ circuit } />
										))
								}
							</ul>) || null
					}
				</li>
			)) }
			<li className={ classes.section }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, defaultSectionsExpandedState.textNoteSection)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "textNoteSection") }>
					Text Note
				</div>
				{
					defaultSectionsExpandedState.textNoteSection && (
						<ul className={ classes.content }>
							<ExplorerItem type="Text Note" />
						</ul>) || null
				}
			</li>
			<li className={ classes.section }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, defaultSectionsExpandedState.inputOutputSection)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "inputOutputSection") }>
					Input / Output
				</div>
				{
					defaultSectionsExpandedState.inputOutputSection && (
						<ul className={ classes.content }>
							<ExplorerItem type="Pin" />
							<ExplorerItem type="Button" />
							<ExplorerItem type="Constant" />
							<ExplorerItem type="Splitter" />
							<ExplorerItem type="LED" />
							<ExplorerItem type="LED Matrix" />
							<ExplorerItem type="Graphics Array" />
							<ExplorerItem type="Probe" />
						</ul>) || null
				}
			</li>
			<li className={ classes.section }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, defaultSectionsExpandedState.primitivesSection)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "primitivesSection") }>
					Primitives
				</div>
				{
					defaultSectionsExpandedState.primitivesSection && (
						<ul className={ classes.content }>
							{ gatterItems.map(gatterItem => <ExplorerItem key={ gatterItem.gatterType } { ...gatterItem } />) }
						</ul>) || null
				}
			</li>
		</ul>
	);
};
//#endregion

//#region ExplorerItem
type ExplorerItemProps =
	CircuitExplorerItemProps |
	BasicItemProps |
	GatterExplorerItemProps;

type CircuitExplorerItemProps = {
	circuit: LogicalCircuit;
};

type BasicItemProps = {
	type: BasicItemType
};

type GatterExplorerItemProps = {
	name: string;
	gatterType: GatterType;
};

const ExplorerItem: React.FC<ExplorerItemProps> = props => {
	const classes = useTheme(themedClasses);

	const editor = "gatterType" in props
		? <GatterItem gatterType={ props.gatterType } isTemplateItem />
		: "type" in props
			? <BasicItem type={ props.type } isTemplateItem />
			: <Circuit mode={ props.circuit.showVisualElements ? "Preview" : "Chip" } circuit={ props.circuit } />

	return (
		<li className={ classes.item }>
			{ editor }
		</li>);
}
//#endregion
