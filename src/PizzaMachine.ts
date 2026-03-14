import { OvenError } from "./MachineError.ts";
import { Box } from "./pantry/Box.ts";
import { Ingredient } from "./pantry/Ingredient.ts";
import { Ingredients } from "./pantry/Ingredients.ts";
import type { Pantry } from "./pantry/Pantry.ts";
import type { Order } from "./pizza/Order.ts";
import { Pizza } from "./pizza/Pizza.ts";
import { Size } from "./pizza/Size.ts";

export class PizzaMachine {
	public constructor(private readonly pantry: Pantry) {}

	/**
	 * Attempts to make and box a pizza for the given order.
	 * Preparation errors are captured as notes on the box rather than thrown,
	 * so callers always receive a box (possibly empty with error notes).
	 * Consumes ingredients from the pantry.
	 */
	public fulfill(order: Order): Box {
		let dough: Ingredients;
		try {
			dough = this.prepareDough();
		} catch (error) {
			const box = Box.of(Size.MD);
			box.addFailureNote(
				`Dough preparation failed: ${(error as Error).message}`,
			);
			return box;
		}

		const pizza = Pizza.rollout(dough, order.pizzaSize);

		let sauce: Ingredients;
		try {
			sauce = this.prepareSauce();
		} catch (error) {
			const box = Box.of(Size.MD);
			box.addFailureNote(
				`Sauce preparation failed: ${(error as Error).message}`,
			);
			return box;
		}

		pizza.spread(sauce);

		let toppings: Ingredients;
		try {
			toppings = this.takeFromPantry(order.toppings);
		} catch (error) {
			const box = Box.of(Size.MD);
			box.addFailureNote(
				`Topping preparation failed: ${(error as Error).message}`,
			);
			return box;
		}

		pizza.addMultiple(toppings);

		if (!this.ovenIsAtTargetTemperature()) {
			throw new OvenError("Oven temperature not at target");
		}

		this.bake(pizza);

		const box: Box = this.pantry.consume(Box.of(order.pizzaSize));
		box.insert(pizza);

		return box;
	}

	private prepareDough(): Ingredients {
		return this.takeFromPantry(
			new Ingredients([Ingredient.FLOUR, Ingredient.SALT, Ingredient.YEAST]),
		);
	}

	private prepareSauce(): Ingredients {
		return this.takeFromPantry(
			new Ingredients([
				Ingredient.GARLIC,
				Ingredient.OREGANO,
				Ingredient.SALT,
				Ingredient.TOMATO,
			]),
		);
	}

	private takeFromPantry(ingredients: Ingredients): Ingredients {
		const ingredientsFromPantry = Ingredients.none();
		for (const ingredient of ingredients) {
			ingredientsFromPantry.add(this.pantry.consume(ingredient));
		}
		return ingredientsFromPantry;
	}

	private bake(pizza: Pizza): void {
		pizza.bake();
	}

	private ovenIsAtTargetTemperature(): boolean {
		const ovenTemperatureCelsius = 400 + Math.random() * 50;
		const targetTemperatureCelsius = 425;
		const acceptableVariance = 23.75;

		return (
			ovenTemperatureCelsius >= targetTemperatureCelsius - acceptableVariance &&
			ovenTemperatureCelsius <= targetTemperatureCelsius + acceptableVariance
		);
	}
}
