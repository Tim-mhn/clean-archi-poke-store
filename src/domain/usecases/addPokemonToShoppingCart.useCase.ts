import { Service } from "typedi"
import { PokemonInCart } from "../entities/shoppingCart.entity"
import { IPokemonRepository } from "../repositories/pokemon.repository"
import { IShoppingCartRepository } from "../repositories/shoppingCart.repository"

export interface AddPokemonToShoppingCartInput {
    pokemonId: string
    shoppingCartId: string
}

export interface AddPokemonToShoppingCartOutput {
    shoppingCart: PokemonInCart[]
}

@Service()
export class AddPokemonToShoppingCartUseCase {
    private shoppingCartRepo: IShoppingCartRepository
    private pokemonRepo: IPokemonRepository

    constructor(
        shoppingCartRepo: IShoppingCartRepository,
        pokemonRepo: IPokemonRepository
    ) {
        this.shoppingCartRepo = shoppingCartRepo
        this.pokemonRepo = pokemonRepo
    }

    public async execute(
        input: AddPokemonToShoppingCartInput
    ): Promise<AddPokemonToShoppingCartOutput> {
        const pokemon = await this.pokemonRepo.getPokemonDetails(
            input.pokemonId
        )
        const shoppingCartIdOutput = await this.shoppingCartRepo.addPokemonToShoppingCart(
            input.shoppingCartId,
            pokemon
        )

        return { shoppingCart: shoppingCartIdOutput }
    }
}
