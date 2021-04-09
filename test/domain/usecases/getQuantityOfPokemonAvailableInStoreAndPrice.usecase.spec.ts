import chai, { expect } from 'chai';
import sinon, { mock } from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('Get quantity of pokemons available and price use case - Get Pokemon Details', () => {

    // it ('should call methods form poke repo, store repo and calculate use case', () => {
    //     const mockPokeRepo = <AbstractPokemonRepository> <any> sinon.createStubInstance(AbstractPokemonRepository);
    //     const mockStoreRepo = <AbstractStoreRepository><any>sinon.createStubInstance(AbstractStoreRepository);
    //     const mockCalculateUsecase = <CalculatePokemonPriceUseCase> <any> sinon.stub(CalculatePokemonPriceUseCase);

    //     // const usecase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(mockPokeRepo, mockStoreRepo, mockCalculateUsecase);
    //     const input = {
    //         storeId: "aaaa",
    //     }

    //     const usecase = sinon.createStubInstance(GetQuantityOfPokemonAvailableInStoreAndPriceUseCase);


    //     usecase.execute(input);

    //     sinon.assert.called();
    //     expect(usecase.getAvailablePokemonsFromStore).to.have.been.called;
    //     expect(mockCalculateUsecase.execute).to.have.been.called;


    // })
})
