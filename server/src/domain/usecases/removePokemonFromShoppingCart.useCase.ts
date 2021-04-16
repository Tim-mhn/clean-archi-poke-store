import { Service } from "typedi"
import { PokemonInCart } from "../entities/shoppingCart.entity"
import { AbstractPokemonRepository } from "../repositories/pokemon.repository"
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository"

export interface RemovePokemonFromShoppingCartInput {
    pokemonId: string
    shoppingCartId: string
}

export interface RemovePokemonFromShoppingCartOutput {
    shoppingCart: PokemonInCart[]
}

@Service()
export class RemovePokemonFromShoppingCartUseCase {
    private shoppingCartRepo: AbstractShoppingCartRepository
    private pokemonRepo: AbstractPokemonRepository

    constructor(
        shoppingCartRepo: AbstractShoppingCartRepository,
        pokemonRepo: AbstractPokemonRepository
    ) {
        this.shoppingCartRepo = shoppingCartRepo
        this.pokemonRepo = pokemonRepo
    }

    public async execute(
        input: RemovePokemonFromShoppingCartInput
    ): Promise<RemovePokemonFromShoppingCartOutput> {
        const pokemon = await this.pokemonRepo.getPokemonDetailsById(
            input.pokemonId
        )
        const shoppingCartIdOutput = await this.shoppingCartRepo.removePokemonFromShoppingCart(
            input.shoppingCartId,
            pokemon
        )

        return { shoppingCart: shoppingCartIdOutput }
    }
}
