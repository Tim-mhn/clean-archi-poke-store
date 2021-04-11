import chai, { expect } from 'chai'
import Sinon, { fake } from 'sinon'
import sinonChai from 'sinon-chai'
import { AddPokemonToShoppingCartUseCase } from '../../../src/domain/usecases/addPokemonToShoppingCart.useCase'
import { PokemonRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/pokemonRepository.proxy'
import { ShoppingCartRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/shoppingCartRepository.proxy'
chai.use(sinonChai)

let pokemonRepo
let shoppingCartRepo
let usecase

describe('AddPokemonToShoppingCartUseCase - constructor', () => {
    beforeEach(() => {
        shoppingCartRepo = Sinon.createStubInstance(
            ShoppingCartRepositoryProxy.getInstance()
        )
        pokemonRepo = Sinon.createStubInstance(
            PokemonRepositoryProxy.getInstance()
        )
    })

    it('constructor should throw error if pokeRepo is null', () => {
        const nullPokeRepo = null
        const usecaseConstructorThatShouldThrow = () =>
            new AddPokemonToShoppingCartUseCase(shoppingCartRepo, nullPokeRepo)
        expect(usecaseConstructorThatShouldThrow).to.throw()
    })

    it('constructor should throw error if shoppingCart is null', () => {
        const nullShoppingCartRepo = null
        const usecaseConstructorThatShouldThrow = () =>
            new AddPokemonToShoppingCartUseCase(
                nullShoppingCartRepo,
                pokemonRepo
            )
        expect(usecaseConstructorThatShouldThrow).to.throw()
    })
})
describe('Add pokemon to shopping cart use case - execute function', () => {
    beforeEach(() => {
        shoppingCartRepo = Sinon.createStubInstance(
            ShoppingCartRepositoryProxy.getInstance()
        )
        pokemonRepo = Sinon.createStubInstance(
            PokemonRepositoryProxy.getInstance()
        )
        usecase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepo,
            pokemonRepo
        )
    })

    it('pokemon store should be called to get pokemon infos', async () => {
        // Stubs
        const pokemonId = '1'
        const shoppingCartId = '1'

        const fakePokemon = {
            id: '2',
            name: 'ivysaur',
            type: 'grass',
            weight: 130,
            level: 1,
            stats: 405,
        }
        const input = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        }
        const storeRepoAvailablePokemons = [{ shoppingCart: [] }]
        shoppingCartRepo = {
            addPokemonToShoppingCart: fake.returns(storeRepoAvailablePokemons),
        }
        pokemonRepo = {
            getPokemonDetailsById: fake.returns(fakePokemon),
        }
        usecase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepo,
            pokemonRepo
        )

        // Execute
        await usecase.execute(input)

        // Expect
        Sinon.assert.calledOnceWithExactly(
            pokemonRepo.getPokemonDetailsById,
            pokemonId
        )
    })

    it('shopping cart repo should be called to create new cart', async () => {
        // Stubs
        const pokemonId = '1'
        const shoppingCartId = '1'

        const fakePokemon = {
            id: '2',
            name: 'ivysaur',
            type: 'grass',
            weight: 130,
            level: 1,
            stats: 405,
        }
        const input = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        }
        const storeRepoAvailablePokemons = [{ shoppingCart: [] }]
        shoppingCartRepo = {
            addPokemonToShoppingCart: fake.returns(storeRepoAvailablePokemons),
        }
        pokemonRepo = {
            getPokemonDetailsById: fake.returns(fakePokemon),
        }
        usecase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepo,
            pokemonRepo
        )

        // Execute
        await usecase.execute(input)

        // Expect
        Sinon.assert.calledOnceWithExactly(
            shoppingCartRepo.addPokemonToShoppingCart,
            shoppingCartId,
            fakePokemon
        )
    })

    it('should return a shopping cart object', async () => {
        // Stubs
        const pokemonId = '1'
        const shoppingCartId = '1'

        const fakePokemon = {
            id: '2',
            name: 'ivysaur',
            type: 'grass',
            weight: 130,
            level: 1,
            stats: 405,
        }
        const input = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        }
        const emptyShoppingCart = [{ shoppingCart: [] }]
        shoppingCartRepo = {
            addPokemonToShoppingCart: fake.returns(emptyShoppingCart),
        }
        pokemonRepo = {
            getPokemonDetailsById: fake.returns(fakePokemon),
        }
        usecase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepo,
            pokemonRepo
        )

        // Execute
        const usecaseOutput = await usecase.execute(input)

        // Expect
        const expectedOutput = {
            shoppingCart: emptyShoppingCart,
        }
        Sinon.assert.match(usecaseOutput, expectedOutput)
    })
})
