import { Pokemon } from "../interfaces/pokemon.interface";

export interface CreateShoppingCartOutputDTO {
    shoppingCart: {
        shoppingCartId: string;
        storeId: string;
        pokemons: Pokemon[]
    }
}