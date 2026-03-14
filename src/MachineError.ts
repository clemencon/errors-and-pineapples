export class MachineError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class BoxFullError extends MachineError {}

export class OrderError extends MachineError {}

export class OvenError extends MachineError {}

export class PantryError extends MachineError {}

export class PizzaDoesNotFitError extends MachineError {}

export class PizzaError extends MachineError {}

export class PineappleError extends PizzaError {}
