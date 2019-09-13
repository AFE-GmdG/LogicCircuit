import * as React from "react";
import { get } from "@easm/core";

import { LocalizedStrings } from "../common";
import { Theme, useTheme, classNames, conditionalClassName } from "../themes";
import { useDataStore, useUIStore } from "../store";
import { GatterType } from "../store/model/gatter";
import {
	LogicalProject,
	Category,
	LogicalCircuit,
	expandOrCollapseCategoryAction,
	expandOrCollapseSpecialCategoryAction
} from "../store/model/logicalProject";

import { BasicItem, BasicItemType } from "./basicItem";
import { Circuit } from "./circuit";
import { GatterItem } from "./gatterItem";

//#region Constants
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

	category: {
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
		position: "relative",
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
	},

	pointer: {
		cursor: "pointer"
	},

	dragDropSvg: {
		flex: "1 0 0px"
	},

	thinLines: {
		stroke: theme.svg.stroke,
		strokeWidth: theme.svg.strokeWidthThin
	},

	blackFill: {
		fill: theme.svg.fillBlack
	},

	whiteFill: {
		fill: theme.svg.fillWhite
	}
});

const strings = new LocalizedStrings({
	en: {
		defaultCategoryName: "Circuit Project",
		textNoteCategoryName: "Text Note",
		inputOutputCategoryName: "Input / Output",
		primitivesCategoryName: "Primitives"
	},
	de: {
		defaultCategoryName: "Schaltungs-Projekt",
		textNoteCategoryName: "Beschriftung",
		inputOutputCategoryName: "Eingang / Ausgang",
		primitivesCategoryName: "Grundformen"
	}
}, "en");

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

export const Explorer: React.FC<ExplorerProps> = props => {
	function expandOrCollapseCategory(event: React.MouseEvent<HTMLDivElement, MouseEvent>, category: Category) {
		expandOrCollapseCategoryAction(category);
		event.stopPropagation();
	}

	function expandOrCollapseDefaultSectionSection(event: React.MouseEvent<HTMLDivElement, MouseEvent>, specialCategory: keyof Pick<LogicalProject, "textNoteCategory" | "inputOutputCategory" | "primitivesCategory">) {
		expandOrCollapseSpecialCategoryAction(specialCategory);
		event.stopPropagation();
	}

	const { className } = props;
	const classes = useTheme(themedClasses);
	const { project } = useDataStore(store => ({
		project: get(store.state.project)
	}));
	const { selectedCircuitId } = useUIStore(store => ({
		selectedCircuitId: get(store.state.selectedCircuitId)
	}));

	const categories = project.categories;

	return (
		<ul className={ classNames(className, classes.explorer) }>
			{
				categories.map(category => (
					<li key={ category.name || 0 } className={ classes.category }>
						<div className={ classNames(classes.header, conditionalClassName(classes.expanded, !category.isCollapsed)) }
							onClick={ event => expandOrCollapseCategory(event, category) }>
							{ category.name || strings.getString("defaultCategoryName", "Circuit Project") }
						</div>
						{
							!category.isCollapsed && (
								<ul className={ classes.content }>
									{
										category.circuits.map(circuit => (
											<ExplorerItem key={ circuit.id } circuit={ circuit } selectedCircuitId={ selectedCircuitId } />
										))
									}
								</ul>
							) || null
						}
					</li>
				))
			}
			<li className={ classes.category }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, !project.textNoteCategory)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "textNoteCategory") }>
					{ strings.getString("textNoteCategoryName", "Text Node") }
				</div>
				{
					!project.textNoteCategory && (
						<ul className={ classes.content }>
							<ExplorerItem type="Text Note" />
						</ul>) || null
				}
			</li>
			<li className={ classes.category }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, !project.inputOutputCategory)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "inputOutputCategory") }>
					{ strings.getString("inputOutputCategoryName", "Input / Output") }
				</div>
				{
					!project.inputOutputCategory && (
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
			<li className={ classes.category }>
				<div className={ classNames(classes.header, conditionalClassName(classes.expanded, !project.primitivesCategory)) }
					onClick={ event => expandOrCollapseDefaultSectionSection(event, "primitivesCategory") }>
					{ strings.getString("primitivesCategoryName", "Primitives") }
				</div>
				{
					!project.primitivesCategory && (
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
	selectedCircuitId: string;
};

type BasicItemProps = {
	type: BasicItemType
};

type GatterExplorerItemProps = {
	name: string;
	gatterType: GatterType;
};

const ExplorerItem: React.FC<ExplorerItemProps> = props => {
	function onDragStart(event: React.DragEvent<HTMLLIElement>) {
		try {
			const { altKey, ctrlKey, shiftKey, metaKey, dataTransfer } = event;
			if (altKey || ctrlKey || shiftKey || metaKey) {
				return;
			}

			dataTransfer.effectAllowed = "copy";
			if ("gatterType" in props) {
				const xmlns = "http://www.w3.org/2000/svg";
				const svgContainer = document.createElement("div");
				svgContainer.id = "drag-drop-image";
				const svg = document.createElementNS(xmlns, "svg");
				svg.setAttributeNS(null, "viewBox", "0 0 40 60");
				svg.classList.add(classes.dragDropSvg);
				const c1 = document.createElementNS(xmlns, "circle");
				c1.setAttributeNS(null, "cx", "5");
				c1.setAttributeNS(null, "cy", "20");
				c1.setAttributeNS(null, "r", "2");
				c1.classList.add(classes.thinLines, classes.blackFill);
				svg.appendChild(c1);
				const c2 = document.createElementNS(xmlns, "circle");
				c2.setAttributeNS(null, "cx", "5");
				c2.setAttributeNS(null, "cy", "40");
				c2.setAttributeNS(null, "r", "2");
				c2.classList.add(classes.thinLines, classes.blackFill);
				svg.appendChild(c2);
				const c3 = document.createElementNS(xmlns, "circle");
				c3.setAttributeNS(null, "cx", "35");
				c3.setAttributeNS(null, "cy", "30");
				c3.setAttributeNS(null, "r", "2");
				c3.classList.add(classes.thinLines, classes.blackFill);
				svg.appendChild(c3);
				const p = document.createElementNS(xmlns, "path");
				p.setAttributeNS(null, "d", "M 5,12 L 20,12 A 15,18 0 0 1 20,48 L 5,48 Z");
				p.classList.add(classes.thinLines, classes.whiteFill);
				svg.appendChild(p);
				svgContainer.appendChild(svg);
				ref.current!.appendChild(svgContainer);
				dataTransfer.setData("gatter:" + props.gatterType, "");
				dataTransfer.setDragImage(svg, 0, 0);
			} else if ("type" in props) {
				dataTransfer.setData("basic:" + props.type, props.type);
			} else {
				dataTransfer.setData("circuit:" + props.circuit.id, props.circuit.id);
			}

		} finally {
			event.stopPropagation();
		}
	}

	function onDragEnd(event: React.DragEvent<HTMLLIElement>) {
		try {
			ref.current!.removeChild(document.getElementById("drag-drop-image") as HTMLElement);
		} finally {
			event.stopPropagation();
		}
	}

	const classes = useTheme(themedClasses);
	const ref = React.useRef<HTMLLIElement>(null);
	const editor = "gatterType" in props
		? <GatterItem gatterType={ props.gatterType } isTemplateItem />
		: "type" in props
			? <BasicItem type={ props.type } isTemplateItem />
			: <Circuit mode={ props.circuit.showVisualElements ? "Preview" : "Chip" } circuit={ props.circuit } />

	const isSelectedCircuit = ("circuit" in props) && props.circuit.id === props.selectedCircuitId;
	return (
		<li ref={ ref }
			className={ classNames(classes.item, conditionalClassName(classes.pointer, !isSelectedCircuit)) }
			draggable={ !isSelectedCircuit }
			onDragStart={ onDragStart }
			onDragEnd={ onDragEnd }>
			{ editor }
		</li>);
}
//#endregion
