import { Pokemon } from "./pokemon.entity"

export interface PokemonInCart {
    pokemon: Pokemon
    quantity: number
}

export interface ShoppingCart {
    shoppingCartId: string
    storeId: string
    pokemons: PokemonInCart[]
}
