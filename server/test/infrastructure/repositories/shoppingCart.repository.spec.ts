import * as chai from 'chai'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Sinon, { fake } from 'sinon'
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
        const quantityOfPokemonAvailable = 3
        const fakeStoreId = '1aBjkhsfd';

        const fakeShoppingCartPokemons = [{ pokemon: fakePokemon, quantity: 1 }]

        shoppingCartRepo.getShoppingCartDetails = fake.returns(
            fakeShoppingCartPokemons
        )

        shoppingCartRepo.getShoppingCartStoreId = fake.returns(
            fakeStoreId
        )

        const outputCart = await shoppingCartRepo.addPokemonToShoppingCart(
            shoppingCartId,
            fakePokemon,
            quantityOfPokemonAvailable
        )
        const outputQuantity = outputCart.find(
            (poke) => poke.pokemon.id === fakePokemon.id
        ).quantity

        expect(outputQuantity).to.equal(2)
    })

    it('Should throw error if no cart are found ', async () => {
        const pokemonRepo = new DBShoppingCartRepository()
        const shoppingCartId = '1'
        const quantityOfPokemonAvailable = 3

        const addPokemonToCartFnThatWillThrow = () =>
            pokemonRepo.addPokemonToShoppingCart(
                shoppingCartId,
                fakePokemon,
                quantityOfPokemonAvailable
            )

        expect(addPokemonToCartFnThatWillThrow()).to.eventually.throw()
    })
})

describe('DB ShoppingCartRepository - Create shopping empty shopping cart', () => {
    it('should return a new empty shopping cart', async () => {
        const shoppingCartRepo = new DBShoppingCartRepository()
        const id = 'randomStoreId'
        const shoppingCartId = 'randomShoppingCartId'

        const availablePokemons = [{ quantity: 1, id: '1' }]
        const store = {
            availablePokemons: availablePokemons,
            id: id,
            name: "poke store",
            location: "paris"
        }

        shoppingCartRepo.randomString = fake.returns(shoppingCartId)

        const outputCart = await shoppingCartRepo.createEmptyShoppingCart(store)

        const expectedOutput = {
            shoppingCartId: shoppingCartId,
            storeId: id,
            pokemons: [],
        }

        Sinon.assert.match(outputCart, expectedOutput)
    })
})
