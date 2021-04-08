import { Pokemon } from "./pokemon.entity"

export interface PokemonInCart {
    pokemon: Pokemon
    quantity: number
}

export interface ShoppingCart {
    id: string
    pokemons: PokemonInCart[]
}
