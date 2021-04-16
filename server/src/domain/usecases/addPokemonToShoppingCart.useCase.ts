import { Service } from 'typedi'
import { PokemonInCart } from '../entities/shoppingCart.entity'
import { AbstractPokemonRepository } from '../repositories/pokemon.repository'
import { AbstractShoppingCartRepository } from '../repositories/shoppingCart.repository'
import { AbstractStoreRepository } from '../repositories/store.repository'

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
    private storeRepo: AbstractStoreRepository

    constructor(
        shoppingCartRepo: AbstractShoppingCartRepository,
        pokemonRepo: AbstractPokemonRepository,
        storeRepo: AbstractStoreRepository
    ) {
        if (!pokemonRepo || !shoppingCartRepo || !storeRepo) {
            throw new Error(
                'Error addPokemonToShoppingCartUseCase usecase constructor. One arg is null'
            )
        }
        this.shoppingCartRepo = shoppingCartRepo
        this.pokemonRepo = pokemonRepo
        this.storeRepo = storeRepo
    }

    public async execute(
        input: AddPokemonToShoppingCartInput
    ): Promise<AddPokemonToShoppingCartOutput> {
        const pokemon = await this.pokemonRepo.getPokemonDetailsById(
            input.pokemonId
        )
        const storeId = await this.shoppingCartRepo.getShoppingCartStoreId(
            input.shoppingCartId
        )
        const pokemonsAvailableInStore = await this.storeRepo.getAvailablePokemonsFromStore(
            storeId
        )

        const pokemonInStore = pokemonsAvailableInStore.find(
            (poke) => poke.id === input.pokemonId
        )

        const quantityOfPokemonAvailableInStore = pokemonInStore
            ? pokemonInStore.quantity
            : 0

        const shoppingCartIdOutput = await this.shoppingCartRepo.addPokemonToShoppingCart(
            input.shoppingCartId,
            pokemon,
            quantityOfPokemonAvailableInStore
        )

        return { shoppingCart: shoppingCartIdOutput }
    }
}
