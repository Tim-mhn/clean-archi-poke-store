import { Pokemon } from "./pokemon.entity";

export interface ShoppingCart {
    id: string;
    pokemons: Pokemon[];
}