export class Size {
	public static readonly SM = new Size("SM", 0);
	public static readonly MD = new Size("MD", 1);
	public static readonly LG = new Size("LG", 2);

	private constructor(
		private readonly name: string,
		private readonly ordinal: number,
	) {}

	public equals(other: Size): boolean {
		return this.ordinal === other.ordinal;
	}

	public isSmallerThan(other: Size): boolean {
		return this.ordinal < other.ordinal;
	}

	public isLargerThan(other: Size): boolean {
		return this.ordinal > other.ordinal;
	}

	public toString(): string {
		return this.name;
	}
}
