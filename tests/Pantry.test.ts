import { expect, test } from "vitest";
import { PantryError } from "../src/MachineError.ts";
import { Ingredient } from "../src/pantry/Ingredient.ts";
import { Pantry } from "../src/pantry/Pantry.ts";

test("replenishing an ingredient makes it available for consumption", () => {
	const pantry = new Pantry();
	pantry.replenish(1, Ingredient.FLOUR);
	const item = pantry.consume(Ingredient.FLOUR);
	expect(item).toBe(Ingredient.FLOUR);
});

test("replenishing an already-stocked ingredient increases its available quantity", () => {
	const pantry = new Pantry();
	pantry.replenish(1, Ingredient.MOZZARELLA);
	pantry.replenish(1, Ingredient.MOZZARELLA);
	expect(pantry.consume(Ingredient.MOZZARELLA)).toBe(Ingredient.MOZZARELLA);
	expect(pantry.consume(Ingredient.MOZZARELLA)).toBe(Ingredient.MOZZARELLA);
});

test("clearing out an ingredient removes it entirely from stock", () => {
	const pantry = new Pantry();
	pantry.replenish(5, Ingredient.OREGANO);
	pantry.clearOutAll(Ingredient.OREGANO);
	expect(() => pantry.consume(Ingredient.OREGANO)).toThrow(PantryError);
});

test("consuming an ingredient after stock is depleted throws a pantry error", () => {
	const pantry = new Pantry();
	pantry.replenish(1, Ingredient.SALT);
	pantry.consume(Ingredient.SALT);
	expect(() => pantry.consume(Ingredient.SALT)).toThrow(PantryError);
});

test("replenishing with zero quantity is rejected", () => {
	const pantry = new Pantry();
	expect(() => pantry.replenish(0, Ingredient.FLOUR)).toThrow(PantryError);
});

test("replenishing with negative quantity is rejected", () => {
	const pantry = new Pantry();
	expect(() => pantry.replenish(-1, Ingredient.FLOUR)).toThrow(PantryError);
});
