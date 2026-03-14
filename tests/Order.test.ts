import { expect, test } from "vitest";
import { OrderError, PineappleError } from "../src/MachineError.ts";
import { Ingredient } from "../src/pantry/Ingredient.ts";
import { Order } from "../src/pizza/Order.ts";
import { Size } from "../src/pizza/Size.ts";

test("a pizza order contains all toppings", () => {
	const order = Order.pizzaOf(Size.LG)
		.with(Ingredient.MOZZARELLA)
		.with(Ingredient.MUSHROOMS)
		.with(Ingredient.BACON);

	expect(order.toppings.has(Ingredient.MOZZARELLA)).toBe(true);
	expect(order.toppings.has(Ingredient.MUSHROOMS)).toBe(true);
	expect(order.toppings.has(Ingredient.BACON)).toBe(true);
});

test("ordering a pizza with duplicate toppings fails", () => {
	expect(() =>
		Order.pizzaOf(Size.MD)
			.with(Ingredient.MOZZARELLA)
			.with(Ingredient.MOZZARELLA),
	).toThrow(OrderError);
});

test("ordering a pizza with pineapple fails", () => {
	expect(() =>
		Order.pizzaOf(Size.LG)
			.with(Ingredient.MOZZARELLA)
			.with(Ingredient.ONIONS)
			.with(Ingredient.SAUSAGE)
			.with(Ingredient.PINEAPPLE),
	).toThrow(PineappleError);
});

test("ordering a pizza that exceeds five toppings fails", () => {
	expect(() =>
		Order.pizzaOf(Size.LG)
			.with(Ingredient.MOZZARELLA)
			.with(Ingredient.MUSHROOMS)
			.with(Ingredient.ONIONS)
			.with(Ingredient.BACON)
			.with(Ingredient.SAUSAGE)
			.with(Ingredient.GARLIC),
	).toThrow(OrderError);
});
