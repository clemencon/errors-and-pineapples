import { OrderError, PineappleError } from "../MachineError.ts";
import { Ingredient } from "../pantry/Ingredient.ts";
import { Ingredients } from "../pantry/Ingredients.ts";
import type { Size } from "./Size.ts";

export class Order {
	private static readonly maxToppings = 5;

	public constructor(
		public readonly pizzaSize: Size,
		public readonly toppings: Ingredients,
	) {}

	public static pizzaOf(size: Size): Order {
		return new Order(size, Ingredients.none());
	}

	public with(topping: Ingredient): Order {
		if (topping === Ingredient.PINEAPPLE) {
			throw new PineappleError("No pineapple allowed on pizza!");
		}
		if (this.toppings.has(topping)) {
			throw new OrderError(`Duplicate topping: ${topping}!`);
		}
		if (this.toppings.quantity >= Order.maxToppings) {
			throw new OrderError("Order exceeds maximum of 5 toppings!");
		}
		this.toppings.add(topping);
		return this;
	}
}
