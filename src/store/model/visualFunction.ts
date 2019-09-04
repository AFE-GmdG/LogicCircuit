export interface VisualFunction {
	turnOn(): void;
	turnOff(): void;
	redraw(): void;

	invalid: boolean;
}
