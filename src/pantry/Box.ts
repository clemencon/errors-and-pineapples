import { BoxFullError, PizzaDoesNotFitError } from "../MachineError.ts";
import { failureLabel, successLabel } from "../pizza/Label.ts";
import type { Pizza } from "../pizza/Pizza.ts";
import type { Size } from "../pizza/Size.ts";
import type { Item } from "./Item.ts";

/** A box may contain a pizza or only the note describing what went wrong during preparation. */
export class Box implements Item {
	public readonly name: string;

	private constructor(
		public readonly size: Size,
		private contents: Pizza | null = null,
		private readonly failureNotes: string[] = [],
	) {
		this.name = `box (${size})`;
	}

	public static of(size: Size): Box {
		return new Box(size);
	}

	public get containsPizza(): boolean {
		return this.contents !== null;
	}

	public get hasFailureNotes(): boolean {
		return this.failureNotes.length > 0;
	}

	public get label(): string {
		if (this.hasFailureNotes) {
			return failureLabel(this.readFailureNotes());
		}

		if (!this.containsPizza) {
			return failureLabel("Missing pizza!");
		}

		return successLabel(`${this.contents?.size}`, `${this.contents}`);
	}

	public insert(pizza: Pizza): void {
		if (this.containsPizza) {
			throw new BoxFullError("Box is already contains a pizza!");
		}
		if (!pizza.size.equals(this.size)) {
			throw new PizzaDoesNotFitError(
				`Pizza (${pizza.size}) does not fit in box (${this.size})`,
			);
		}
		this.contents = pizza;
	}

	public open(): Pizza | null {
		return this.contents;
	}

	public addFailureNote(note: string): void {
		this.failureNotes.push(note);
	}

	public readFailureNotes(): string {
		return this.failureNotes.join("\n");
	}

	public toString(): string {
		return this.name;
	}
}
