import { Pokemon } from "../entities/pokemon.entity"
import { PokemonInCart } from "../entities/shoppingCart.entity"

export interface IShoppingCartRepository {
    getShoppingCartDetails: (id: string) => Promise<PokemonInCart[]>
    createShoppingCart: () => Promise<string>
    addPokemonToShoppingCart: (
        shoppingCartId: string,
        pokemon: Pokemon
    ) => Promise<PokemonInCart[]>
}
