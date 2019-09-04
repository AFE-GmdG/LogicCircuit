export type Gatter =
	NotGatter |
	AndGatter | NandGatter |
	OrGatter | NorGatter |
	XorGatter | XnorGatter;

export type GatterType = Gatter["name"];

export type NotGatter = {
	name: "Not";
	// gatterFunction: andFunction;
};

export type AndGatter = {
	name: "And";
};

export type NandGatter = {
	name: "Nand";
};

export type OrGatter = {
	name: "Or";
};

export type NorGatter = {
	name: "Nor";
};

export type XorGatter = {
	name: "Xor";
};

export type XnorGatter = {
	name: "Xnor";
};
