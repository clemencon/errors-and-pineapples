import type { Item } from "./Item.ts";

export class Ingredient implements Item {
	public static readonly ANCHOVIES = new Ingredient("anchovies");
	public static readonly BACON = new Ingredient("bacon");
	public static readonly BLACK_OLIVES = new Ingredient("black olives");
	public static readonly FLOUR = new Ingredient("flour");
	public static readonly GARLIC = new Ingredient("garlic");
	public static readonly HAM = new Ingredient("ham");
	public static readonly JALAPENOS = new Ingredient("jalapeños");
	public static readonly MOZZARELLA = new Ingredient("mozzarella");
	public static readonly MUSHROOMS = new Ingredient("mushrooms");
	public static readonly ONIONS = new Ingredient("onions");
	public static readonly OREGANO = new Ingredient("oregano");
	public static readonly PINEAPPLE = new Ingredient("pineapple");
	public static readonly SALT = new Ingredient("salt");
	public static readonly SAUSAGE = new Ingredient("sausage");
	public static readonly SPINACH = new Ingredient("spinach");
	public static readonly TOMATO = new Ingredient("tomatoes");
	public static readonly TOMATOES = new Ingredient("tomatoes");
	public static readonly YEAST = new Ingredient("yeast");

	protected constructor(public readonly name: string) {}

	public toString(): string {
		return this.name;
	}
}
