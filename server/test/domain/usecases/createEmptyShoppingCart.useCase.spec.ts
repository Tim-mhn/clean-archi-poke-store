import chai, { expect } from 'chai';
import Sinon, { fake } from "sinon";
import sinonChai from 'sinon-chai';
import { CreateEmptyShoppingCartUseCase } from '../../../src/domain/usecases/createEmptyShoppingCart.useCase';
import { ShoppingCartRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/shoppingCartRepository.proxy';
import { StoreRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/storeRepository.proxy';
chai.use(sinonChai);

let shoppingCartRepo;
let storeRepo;
let createEmptyShoppingCartUseCase;
let usecase;

describe('CreateEmptyShoppingCartUseCase - constructor', () => {
    beforeEach(() => {
        shoppingCartRepo = Sinon.createStubInstance(ShoppingCartRepositoryProxy.getInstance());
        storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());
        createEmptyShoppingCartUseCase = Sinon.createStubInstance(CreateEmptyShoppingCartUseCase);
    })

    it('constructor should throw error if shoppingCartRepo is null', () => {
        const nullShoppingCartRepo = null;
        const usecaseConstructorThatShouldThrow = () => new CreateEmptyShoppingCartUseCase(nullShoppingCartRepo, storeRepo);
        expect(usecaseConstructorThatShouldThrow).to.throw();
        
    })

    it('constructor should throw error if storeRepo is null', () => {
        const nullStoreRepo = null;
        const usecaseConstructorThatShouldThrow = () => new CreateEmptyShoppingCartUseCase(shoppingCartRepo, nullStoreRepo);
        expect(usecaseConstructorThatShouldThrow).to.throw();
        
    })

})
describe('Create empty shopping cart - execute function', () => {

    beforeEach( () => {
        shoppingCartRepo = Sinon.createStubInstance(ShoppingCartRepositoryProxy.getInstance());
        storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());
        createEmptyShoppingCartUseCase = Sinon.createStubInstance(CreateEmptyShoppingCartUseCase);

    })
    
    it('createEmptyShoppingCart should be called with return from getStoreById', async () => {
        // Stubs
        const storeId = "randomStoreId"
        const shoppingCartId = "randomShoppingCartId"
        const availablePokemons = [{ quantity: 1, id: "1" }]
        const input = { storeId: storeId }

        const fakeShoppingCart = { storeId: storeId, shoppinCartId: shoppingCartId, pokemons: []}
        shoppingCartRepo = {
            createEmptyShoppingCart: fake.returns(fakeShoppingCart)
        };

        const fakeStore = { id: storeId, availablePokemons: availablePokemons }
        storeRepo = {
            getStoreById: fake.returns(fakeStore)
        }

        const createEmptyShoppingCartInput = { id: storeId, availablePokemons: availablePokemons }
        usecase = new CreateEmptyShoppingCartUseCase(shoppingCartRepo, storeRepo);

        // Execute
        await usecase.execute(input);

        // Expect
        Sinon.assert.calledOnceWithExactly(shoppingCartRepo.createEmptyShoppingCart, createEmptyShoppingCartInput);

    })

    it('Execute function should return a shoppingCart with a shoppingCartId, storeId and an empty list of pokemons', async () => {
        // Stubs
        const storeId = "randomStoreId"
        const shoppingCartId = "randomShoppingCartId"
        const availablePokemons = [{ quantity: 1, id: "1" }]
        const input = { storeId: storeId }

        const fakeShoppingCart = { storeId: storeId, shoppingCartId: shoppingCartId, pokemons: []}
        shoppingCartRepo = {
            createEmptyShoppingCart: fake.returns(fakeShoppingCart)
        };

        const fakeStore = { id: storeId, availablePokemons: availablePokemons }
        storeRepo = {
            getStoreById: fake.returns(fakeStore)
        }

        usecase = new CreateEmptyShoppingCartUseCase(shoppingCartRepo, storeRepo);

        // Execute
        const usecaseOutput = await usecase.execute(input);

        // Expect
        const expectedOutput = {
            storeId: storeId,
            shoppingCartId: shoppingCartId,
            pokemons: []
        }

        Sinon.assert.match(usecaseOutput.shoppingCart, expectedOutput)

    })

})
