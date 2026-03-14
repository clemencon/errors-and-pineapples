import { PineappleError, PizzaError } from "../MachineError.ts";
import { Ingredient } from "../pantry/Ingredient.ts";
import { Ingredients } from "../pantry/Ingredients.ts";
import type { Size } from "./Size.ts";

/**
 * Make a pizza:
 * rollout → spread sauce → add toppings → bake.
 * Each step enforces that prior steps have been completed.
 */
export class Pizza {
	private static maxAmountOfToppings = 5;
	private isBaked = false;

	private constructor(
		public readonly size: Size,
		private dough: Ingredients,
		private sauce: Ingredients,
		private toppings: Ingredients,
	) {}

	public static rollout(dough: Ingredients, size: Size): Pizza {
		const sauce = Ingredients.none();
		const toppings = Ingredients.none();
		return new Pizza(size, dough, sauce, toppings);
	}

	public get isCrusty(): boolean {
		return this.isBaked;
	}

	public spread(sauce: Ingredients): void {
		if (this.isSauced) {
			throw new PizzaError("Pizza is already sauced!");
		}
		if (this.hasToppings) {
			throw new PizzaError("Can't spread sauce after adding toppings!");
		}
		this.sauce = sauce;
	}

	public addMultiple(toppings: Ingredients): void {
		if (this.willExceedMaximumAfterAdding(toppings)) {
			throw new PizzaError(
				`Adding ${toppings.quantity} toppings would exceed the maximum of ${Pizza.maxAmountOfToppings}!`,
			);
		}
		for (const topping of toppings) {
			this.addTopping(topping);
		}
	}

	public bake(): void {
		if (this.isCrusty) {
			throw new PizzaError("Pizza will burn!");
		}
		this.isBaked = true;
	}

	public toString(): string {
		return `toppings: ${this.toppings}\nsauce: ${this.sauce}\ndough: ${this.dough}`;
	}

	private addTopping(topping: Ingredient): void {
		if (topping === Ingredient.PINEAPPLE) {
			throw new PineappleError("No pineapple allowed on pizza!");
		}
		if (!this.isSauced) {
			throw new PizzaError("Can't add toppings without sauce!");
		}
		if (this.isFullyTopped) {
			throw new PizzaError("Too many toppings!");
		}
		this.toppings.add(topping);
	}

	private get isSauced(): boolean {
		return this.sauce.quantity > 0;
	}

	private get hasToppings(): boolean {
		return this.toppings.quantity > 0;
	}

	private get isFullyTopped(): boolean {
		return this.toppings.quantity >= Pizza.maxAmountOfToppings;
	}

	private willExceedMaximumAfterAdding(toppings: Ingredients): boolean {
		return (
			this.toppings.quantity + toppings.quantity > Pizza.maxAmountOfToppings
		);
	}
}
