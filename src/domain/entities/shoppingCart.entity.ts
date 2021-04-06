import { Pokemon } from "./pokemon.entity";

export interface shoppingCart {
    id: string;
    contains: Pokemon[];
}