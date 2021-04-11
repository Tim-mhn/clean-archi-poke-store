import * as chai from 'chai'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { fake } from 'sinon'
import { PokemonType } from '../../../src/domain/entities/pokemon.entity'
import { DBShoppingCartRepository } from '../../../src/infrastructure/repositories/shoppingCart.repository'
chai.use(chaiAsPromised)

const fakePokemon = {
    id: '2',
    name: 'ivysaur',
    type: PokemonType.GRASS,
    weight: 130,
    level: 1,
    stats: 405,
}

describe('DB ShoppingCartRepository - Add pokemon to shopping cart', () => {
    it('should return a cart with quantity updated', async () => {
        const shoppingCartRepo = new DBShoppingCartRepository()
        const shoppingCartId = '1'

        const fakeShoppingCartPokemons = [{ pokemon: fakePokemon, quantity: 1 }]

        shoppingCartRepo.getShoppingCartDetails = fake.returns(
            fakeShoppingCartPokemons
        )

        const outputCart = await shoppingCartRepo.addPokemonToShoppingCart(
            shoppingCartId,
            fakePokemon
        )
        const outputQuantity = outputCart.find(
            (poke) => poke.pokemon.id === fakePokemon.id
        ).quantity

        expect(outputQuantity).to.equal(2)
    })

    it('Should throw error if no cart are found ', async () => {
        const pokemonRepo = new DBShoppingCartRepository()
        const shoppingCartId = '1'

        const addPokemonToCartFnThatWillThrow = () =>
            pokemonRepo.addPokemonToShoppingCart(shoppingCartId, fakePokemon)

        expect(addPokemonToCartFnThatWillThrow()).to.eventually.throw()
    })
})
