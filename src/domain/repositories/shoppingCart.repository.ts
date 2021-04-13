import { Service } from 'typedi'
import { Pokemon } from '../entities/pokemon.entity'
import { PokemonInCart, ShoppingCart } from '../entities/shoppingCart.entity'
import { Store } from '../entities/store.entity'
@Service()
export abstract class AbstractShoppingCartRepository {
    abstract getShoppingCartStoreId(shoppingCartId: string): Promise<string>
    abstract getShoppingCartDetails(
        shoppingCartId: string
    ): Promise<PokemonInCart[]>
    abstract createEmptyShoppingCart(store: Store): Promise<ShoppingCart>
    abstract addPokemonToShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon,
        quantityOfPokemonAvailableInStore: number
    ): Promise<PokemonInCart[]>
    abstract removePokemonFromShoppingCart(
        shoppingCartId: string,
        pokemon: Pokemon
    ): Promise<PokemonInCart[]>
}
