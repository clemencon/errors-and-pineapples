import { expect, test } from "vitest";
import { BoxFullError, PizzaDoesNotFitError } from "../src/MachineError.ts";
import { Box } from "../src/pantry/Box.ts";
import { Ingredient } from "../src/pantry/Ingredient.ts";
import { Ingredients } from "../src/pantry/Ingredients.ts";
import { Pizza } from "../src/pizza/Pizza.ts";
import { Size } from "../src/pizza/Size.ts";

test("inserting a matching-size pizza into the box succeeds", () => {
	const pizza = makePizza();
	const box = Box.of(Size.SM);
	box.insert(pizza);
	expect(box.containsPizza).toBe(true);
});

test("inserting a pizza into a box that is too small fails", () => {
	const pizza = makePizza(Size.LG);
	expect(() => Box.of(Size.SM).insert(pizza)).toThrow(PizzaDoesNotFitError);
});

test("inserting a pizza into a box that is too large fails", () => {
	const pizza = makePizza();
	expect(() => Box.of(Size.LG).insert(pizza)).toThrow(PizzaDoesNotFitError);
});

test("inserting a second pizza into a filled box fails", () => {
	const first = makePizza();
	const second = makePizza();
	const box = Box.of(Size.SM);
	box.insert(first);
	expect(() => box.insert(second)).toThrow(BoxFullError);
});

test("opening an empty box yields no pizza", () => {
	expect(Box.of(Size.SM).containsPizza).toBe(false);
});

test("the label on a box shows the failures", () => {
	const box = Box.of(Size.SM);
	box.addFailureNote("Oven caught fire!");
	expect(box.label).toContain("MACHINE ERROR");
	expect(box.label).toContain("Oven caught fire!");
});

test("the label on an empty box reports a missing pizza", () => {
	const box = Box.of(Size.SM);
	expect(box.label).toContain("Missing pizza!");
});

function makePizza(size: Size = Size.SM): Pizza {
	const dough = new Ingredients([
		Ingredient.FLOUR,
		Ingredient.SALT,
		Ingredient.YEAST,
	]);
	return Pizza.rollout(dough, size);
}
