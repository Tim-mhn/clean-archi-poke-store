import chai, { expect } from 'chai';
import Sinon, { fake } from "sinon";
import sinonChai from 'sinon-chai';
import { CalculatePokemonPriceUseCase } from '../../../src/domain/usecases/calculatePokemonPrice.useCase';
import { GetQuantityOfPokemonAvailableInStoreAndPriceUseCase } from '../../../src/domain/usecases/getQuantityOfPokemonAvailableInStoreAndPrice.usecase';
import { PokemonRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/pokemonRepository.proxy';
import { StoreRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/storeRepository.proxy';
chai.use(sinonChai);

let pokemonRepo;
let storeRepo;
let calculatePokemonPriceUsecase;
let usecase;

describe('GetQuantityOfPokemonAvailableInStoreAndPriceUseCase - constructor', () => {
    beforeEach(() => {
        storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());
        pokemonRepo = Sinon.createStubInstance(PokemonRepositoryProxy.getInstance());
        calculatePokemonPriceUsecase = Sinon.createStubInstance(CalculatePokemonPriceUseCase);
    })

    it('constructor should throw error if pokeRepo is null', () => {
        const nullPokeRepo = null;
        const usecaseConstructorThatShouldThrow = () => new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(nullPokeRepo, storeRepo, calculatePokemonPriceUsecase);
        expect(usecaseConstructorThatShouldThrow).to.throw();
        
    })

    it('constructor should throw error if storeRepo is null', () => {
        const nullStoreRepo = null;
        const usecaseConstructorThatShouldThrow = () => new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepo, nullStoreRepo, calculatePokemonPriceUsecase);
        expect(usecaseConstructorThatShouldThrow).to.throw();

    })

    it('constructor should throw error if calcUsecase is null', () => {
        const nullUsecase = null;
        const usecaseConstructorThatShouldThrow = () => new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepo, storeRepo, nullUsecase);
        expect(usecaseConstructorThatShouldThrow).to.throw();

    })
})
describe('Get quantity of pokemons available and price use case - execute function', () => {

    beforeEach( () => {
        storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());
        pokemonRepo = Sinon.createStubInstance(PokemonRepositoryProxy.getInstance());
        calculatePokemonPriceUsecase = Sinon.createStubInstance(CalculatePokemonPriceUseCase);
        usecase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepo, storeRepo, calculatePokemonPriceUsecase);
    })

    it('Store repo should be called in input.storeId', async () => {
        // Stubs
        const storeId = "a4_caecd";
        const input = { storeId: storeId}
        const storeRepoAvailablePokemons = [ { quantity: 1, id: "1"}]
        storeRepo = {
            getAvailablePokemonsFromStore: fake.returns(storeRepoAvailablePokemons)
        };
        usecase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepo, storeRepo, calculatePokemonPriceUsecase);
        Sinon.stub(usecase, "getAvailablePokemonsWithPriceAndQty").returns(1);

        // Execute
        await usecase.execute( input);


        // Expect
        Sinon.assert.calledOnceWithExactly(storeRepo.getAvailablePokemonsFromStore, storeId);


    })

    it('should return an object with id = input.storeId and output of getAvailablePokemonsWithPriceAndQty', async () => {
        // Stubs
        const storeId = "a4_caecd";
        const input = { storeId: storeId }
        const storeRepoAvailablePokemons = [{ quantity: 1, id: "1" }]
        storeRepo = {
            getAvailablePokemonsFromStore: fake.returns(storeRepoAvailablePokemons)
        };
        usecase.storeRepo = storeRepo;
        const getAvailablePokemonsWithPriceAndQtyRes = [{ quantity: 1, id: "1", price: 2}]
        Sinon.stub(usecase, "getAvailablePokemonsWithPriceAndQty").returns(getAvailablePokemonsWithPriceAndQtyRes);

        // Execute
        const usecaseOutput = await usecase.execute(input);
        

        // Expect
        const expectedOutput = {
            id: storeId,
            availablePokemonsWithPriceAndQuantity: getAvailablePokemonsWithPriceAndQtyRes
        }
        Sinon.assert.match(usecaseOutput, expectedOutput)


    })
})
