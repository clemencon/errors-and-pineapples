import type { Ingredient } from "./Ingredient.ts";

export class Ingredients {
	private readonly ingredients: Ingredient[];

	public static none(): Ingredients {
		return new Ingredients([]);
	}

	public constructor(ingredients: Ingredient[]) {
		this.ingredients = ingredients;
	}

	public get quantity(): number {
		return this.ingredients.length;
	}

	public has(ingredient: Ingredient): boolean {
		return this.ingredients.includes(ingredient);
	}

	public add(other: Ingredient): void {
		this.ingredients.push(other);
	}

	public addMultiple(other: Ingredients): void {
		this.ingredients.push(...other.ingredients);
	}

	public [Symbol.iterator](): Iterator<Ingredient> {
		return this.ingredients[Symbol.iterator]();
	}

	public toString(): string {
		return this.ingredients.join(", ");
	}
}
