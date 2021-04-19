import { AvailablePokemon } from "./available-pokemon.interface";

export interface ShoppingCart {
    pokemons: AvailablePokemon[];
    cartPrice: number;
    readyDate: Date;
    shoppingCartId: string;
}