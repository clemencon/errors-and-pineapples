import dedent from "dedent";
import { expect, test } from "vitest";
import { Ingredient } from "../src/pantry/Ingredient.ts";
import { Order } from "../src/pizza/Order.ts";
import { Size } from "../src/pizza/Size.ts";
import { PizzaMachineBuilder } from "./PizzaMachineBuilder.ts";

test("fulfilling a pizza order produces a labeled box containing a baked pizza", () => {
	const pizzaMachine = PizzaMachineBuilder.withStockedPantry().build();
	const order = Order.pizzaOf(Size.MD)
		.with(Ingredient.BLACK_OLIVES)
		.with(Ingredient.MOZZARELLA)
		.with(Ingredient.ANCHOVIES);

	const box = pizzaMachine.fulfill(order);
	const bakedPizza = box.open();

	expect(box.size).toBe(Size.MD);
	expect(bakedPizza?.isCrusty).toBe(true);
	expect(box.label).toBe(dedent`
    *************
    MARIO'S PIZZA
    *************
    Artisanal handmade biodegradable pizza.
    pizza size: MD
    toppings: black olives, mozzarella, anchovies
    sauce: garlic, oregano, salt, tomatoes
    dough: flour, salt, yeast
    *************
    Buon Appetito
    `);
});

test("fulfilling an order when a dough ingredient is out of stock produces an empty box with an error note", () => {
	const pizzaMachine = PizzaMachineBuilder.withStockedPantry()
		.withOutOfStock(Ingredient.FLOUR)
		.build();
	const order = Order.pizzaOf(Size.MD).with(Ingredient.MOZZARELLA);

	const box = pizzaMachine.fulfill(order);

	expect(box.containsPizza).toBe(false);
	expect(box.label).toBe(dedent`
    *************
    MACHINE ERROR
    *************
    failure notes:
    Dough preparation failed: flour is out of stock!
    *************
    `);
});

test("fulfilling an order when a sauce ingredient is out of stock produces an empty box with an error note", () => {
	const pizzaMachine = PizzaMachineBuilder.withStockedPantry()
		.withOutOfStock(Ingredient.TOMATO)
		.build();
	const order = Order.pizzaOf(Size.MD).with(Ingredient.MOZZARELLA);

	const box = pizzaMachine.fulfill(order);

	expect(box.containsPizza).toBe(false);
	expect(box.label).toBe(dedent`
    *************
    MACHINE ERROR
    *************
    failure notes:
    Sauce preparation failed: tomatoes is out of stock!
    *************
    `);
});

test("fulfilling an order when a topping is out of stock produces an empty box with an error note", () => {
	const pizzaMachine = PizzaMachineBuilder.withStockedPantry()
		.withOutOfStock(Ingredient.MOZZARELLA)
		.build();
	const order = Order.pizzaOf(Size.MD).with(Ingredient.MOZZARELLA);

	const box = pizzaMachine.fulfill(order);

	expect(box.containsPizza).toBe(false);
	expect(box.label).toBe(dedent`
    *************
    MACHINE ERROR
    *************
    failure notes:
    Topping preparation failed: mozzarella is out of stock!
    *************
    `);
});
