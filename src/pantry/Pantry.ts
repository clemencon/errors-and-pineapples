import { PantryError } from "../MachineError.ts";
import type { Item } from "./Item.ts";

export class Pantry {
	private readonly bins: Map<string, Bin> = new Map();

	public replenish(quantity: number, item: Item): void {
		if (quantity < 1) {
			throw new PantryError(`Invalid replenishment quantity: ${quantity}`);
		}

		const entry = this.bins.get(item.name);

		if (entry) {
			entry.replenish(quantity);
		} else {
			this.bins.set(item.name, new Bin(item, quantity));
		}
	}

	/** Removes one unit from stock and returns the item. Throws PantryError if out of stock. */
	public consume<ItemType extends Item>(item: ItemType): ItemType {
		const entry = this.bins.get(item.name);
		if (!entry) {
			throw new PantryError(`${item.name} is out of stock!`);
		}
		return entry.consume() as ItemType;
	}

	public clearOutAll(item: Item): void {
		this.bins.delete(item.name);
	}
}

class Bin {
	private quantity: number;

	public constructor(
		public readonly item: Item,
		quantity: number,
	) {
		this.quantity = quantity;
	}

	public replenish(quantity: number): void {
		if (quantity < 1) {
			throw new PantryError(`Invalid replenishment amount: ${quantity}`);
		}
		this.quantity += quantity;
	}

	public consume(): Item {
		if (!this.isAvailable()) {
			throw new PantryError(`Item ${this.item.name} is out of stock!`);
		}
		this.quantity -= 1;
		return this.item;
	}

	private isAvailable(): boolean {
		return this.quantity > 0;
	}
}
