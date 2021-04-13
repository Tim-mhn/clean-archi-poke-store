import { Service } from 'typedi'
import { PokemonType } from '../../domain/entities/pokemon.entity'
import {
    PokemonNotAvailableInStoreError,
    ShoppingCartNotFoundError,
} from '../../domain/errors/shoppingCart.errors'

type PokemonInfo = {
    id: string
    name: string
    type: PokemonType
    weight: number
}

type PokemonInCartType = { quantity: number; pokemon: PokemonInfo }

type AddPokemonToShoppingCartPresenterOutput = {
    shoppingCart: PokemonInCartType[]
}

@Service()
export class AddPokemonToShoppingCartPresenter {
    public present(
        useCaseOutput: AddPokemonToShoppingCartPresenterOutput
    ): AddPokemonToShoppingCartPresenterOutput {
        return {
            shoppingCart: useCaseOutput.shoppingCart.map((pokeInCart) => ({
                quantity: pokeInCart.quantity,
                pokemon: {
                    id: pokeInCart.pokemon.id,
                    name: pokeInCart.pokemon.name,
                    type: pokeInCart.pokemon.type,
                    weight: pokeInCart.pokemon.weight,
                },
            })),
        }
    }

    public presentOnError(error: Error) {
        let errorMessage
        let statusCode

        if (error instanceof PokemonNotAvailableInStoreError) {
            errorMessage = error.message
            statusCode = 403
            return [statusCode, { message: errorMessage }]
        }
        if (error instanceof ShoppingCartNotFoundError) {
            errorMessage = error.message
            statusCode = 403
            return [statusCode, { message: errorMessage }]
        }

        errorMessage = 'Internal error when adding pokemon to cart'
        statusCode = 500
        return [statusCode, { message: errorMessage }]
    }
}
