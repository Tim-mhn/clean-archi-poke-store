import { Service } from 'typedi'
import { PokemonInCart } from '../entities/shoppingCart.entity'
import { AbstractPokemonRepository } from '../repositories/pokemon.repository'
import { AbstractShoppingCartRepository } from '../repositories/shoppingCart.repository'

export interface AddPokemonToShoppingCartInput {
    pokemonId: string
    shoppingCartId: string
}

export interface AddPokemonToShoppingCartOutput {
    shoppingCart: PokemonInCart[]
}

@Service()
export class AddPokemonToShoppingCartUseCase {
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
        input: AddPokemonToShoppingCartInput
    ): Promise<AddPokemonToShoppingCartOutput> {
        const pokemon = await this.pokemonRepo.getPokemonDetailsById(
            input.pokemonId
        )
        const shoppingCartIdOutput = await this.shoppingCartRepo.addPokemonToShoppingCart(
            input.shoppingCartId,
            pokemon
        )

        return { shoppingCart: shoppingCartIdOutput }
    }
}
