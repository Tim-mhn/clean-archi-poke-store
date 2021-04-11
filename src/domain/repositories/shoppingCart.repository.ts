import { Service } from "typedi"
import { Pokemon } from "../entities/pokemon.entity"
import { PokemonInCart } from "../entities/shoppingCart.entity"
@Service()
export abstract class AbstractShoppingCartRepository {
    abstract getShoppingCartDetails(id: string): Promise<PokemonInCart[]>
    abstract createShoppingCart():  Promise<string>
    abstract addPokemonToShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon
    ): Promise<PokemonInCart[]>
    abstract removePokemonFromShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon
    ): Promise<PokemonInCart[]>
}
