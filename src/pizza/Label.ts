import dedent from "dedent";

export function successLabel(size: string, ingredients: string): string {
	return dedent`
        *************
        MARIO'S PIZZA
        *************
        Artisanal handmade biodegradable pizza.
        pizza size: ${size}
        ${ingredients}
        *************
        Buon Appetito
    `;
}

export function failureLabel(notes: string): string {
	return dedent`
        *************
        MACHINE ERROR
        *************
        failure notes:
        ${notes}
        *************
    `;
}
