import { PizzaMachine } from "../src/PizzaMachine.ts";
import { Box } from "../src/pantry/Box.ts";
import { Ingredient } from "../src/pantry/Ingredient.ts";
import type { Item } from "../src/pantry/Item.ts";
import { Pantry } from "../src/pantry/Pantry.ts";
import { Size } from "../src/pizza/Size.ts";

export class PizzaMachineBuilder {
	private constructor(private readonly pantry: Pantry) {}

	public static withStockedPantry(): PizzaMachineBuilder {
		const pantry = new Pantry();

		pantry.replenish(50, Box.of(Size.LG));
		pantry.replenish(50, Box.of(Size.MD));
		pantry.replenish(50, Box.of(Size.SM));

		pantry.replenish(50, Ingredient.ANCHOVIES);
		pantry.replenish(50, Ingredient.BACON);
		pantry.replenish(50, Ingredient.BLACK_OLIVES);
		pantry.replenish(50, Ingredient.FLOUR);
		pantry.replenish(50, Ingredient.GARLIC);
		pantry.replenish(50, Ingredient.HAM);
		pantry.replenish(50, Ingredient.JALAPENOS);
		pantry.replenish(50, Ingredient.MOZZARELLA);
		pantry.replenish(50, Ingredient.MUSHROOMS);
		pantry.replenish(50, Ingredient.ONIONS);
		pantry.replenish(50, Ingredient.OREGANO);
		pantry.replenish(50, Ingredient.PINEAPPLE);
		pantry.replenish(50, Ingredient.SALT);
		pantry.replenish(50, Ingredient.SAUSAGE);
		pantry.replenish(50, Ingredient.SPINACH);
		pantry.replenish(50, Ingredient.TOMATO);
		pantry.replenish(50, Ingredient.TOMATOES);
		pantry.replenish(50, Ingredient.YEAST);

		return new PizzaMachineBuilder(pantry);
	}

	public withOutOfStock(item: Item): PizzaMachineBuilder {
		this.pantry.clearOutAll(item);
		return this;
	}

	public build(): PizzaMachine {
		return new PizzaMachine(this.pantry);
	}
}
