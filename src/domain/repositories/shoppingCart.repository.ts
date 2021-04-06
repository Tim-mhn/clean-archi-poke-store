import { Pokemon } from "../entities/pokemon.entity";

export interface IShoppingCartRepository {
    getShoppingCartDetails: (id: string) =>  Promise<Pokemon[]>;
} 