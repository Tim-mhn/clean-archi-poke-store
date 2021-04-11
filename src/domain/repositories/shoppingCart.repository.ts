import { Service } from "typedi"
import { Pokemon } from "../entities/pokemon.entity"
import { PokemonInCart, ShoppingCart } from "../entities/shoppingCart.entity"
@Service()
export abstract class AbstractShoppingCartRepository {
    abstract getShoppingCartDetails(shoppingCartId: string): Promise<PokemonInCart[]>
    abstract createShoppingCart(storeId: string):  Promise<ShoppingCart>
    abstract addPokemonToShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon
    ): Promise<PokemonInCart[]>
    abstract removePokemonFromShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon
    ): Promise<PokemonInCart[]>
}
