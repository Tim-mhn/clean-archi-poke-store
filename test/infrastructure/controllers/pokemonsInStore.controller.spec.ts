import chai, { expect } from 'chai';
import { Response } from 'express';
import Sinon, { fake } from "sinon";
import sinonChai from 'sinon-chai';
import { AbstractPokemonRepository } from '../../../src/domain/repositories/pokemon.repository';
import { AbstractStoreRepository } from '../../../src/domain/repositories/store.repository';
import { GetQuantityOfPokemonAvailableInStoreAndPriceUseCase } from '../../../src/domain/usecases/getQuantityOfPokemonAvailableInStoreAndPrice.usecase';
import { PokemonsInStoreController } from '../../../src/infrastructure/controllers/pokemonsInStore.controller';
import { GetQuantityOfPokemonAvailableInStoreAndPricePresenter } from '../../../src/infrastructure/presenters/getQuantityOfPokemonAvailableInStoreAndPrice.presenter';
import { PokemonRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/pokemonRepository.proxy';
import { StoreRepositoryProxy } from '../../../src/infrastructure/repositoryProxies/storeRepository.proxy';

chai.use(sinonChai);
let presenter;
let storeRepo;
let pokeRepo;
let usecase;
let controller;


describe('PokemonsInStoreController @Get /:storeId endpoint', () => {
    beforeEach(() => {
        presenter = Sinon.createStubInstance(GetQuantityOfPokemonAvailableInStoreAndPricePresenter);
        storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());
        pokeRepo = Sinon.createStubInstance(PokemonRepositoryProxy.getInstance());

        usecase = Sinon.createStubInstance(GetQuantityOfPokemonAvailableInStoreAndPriceUseCase);
        controller = new PokemonsInStoreController(
            pokeRepo as unknown as AbstractPokemonRepository,
            storeRepo as unknown as AbstractStoreRepository,
            presenter as unknown as GetQuantityOfPokemonAvailableInStoreAndPricePresenter);


        controller.getQuantityOfPokemonAvailableInStoreAndPriceUseCase = <GetQuantityOfPokemonAvailableInStoreAndPriceUseCase><any>usecase;

    })
    it('should call usecase execute, presenter present and response status 200 if no error are thrown', async () => {
        // Fakes and stubs
        const res = {
            status: fake.returns({
                json: fake.returns({}),
            }),
        };
        const storeId = "someId"
        const input = {
            storeId: storeId
        }


        // Execute
        await controller.getAvailablePokemonsWithPriceFromStore(storeId, <Response><any>res);


        // Assert
        Sinon.assert.calledOnceWithMatch(usecase.execute, input);
        Sinon.assert.calledOnce(presenter.present);
        Sinon.assert.calledOnceWithMatch(res.status, 200);
    })

    it('should return the output of present in response if no error are thrown', async () => {
        // Fakes and stubs
        const res = {
            status: fake.returns({
                json: fake.returns({}),
            }),
        };
        const storeId = "someId"
        const input = {
            storeId: storeId
        }
        const presenterOutput = {
            "a": 1
        }
        const fakePresenter = {
            present: fake.returns(presenterOutput)
        }
        controller.presenter = fakePresenter;

        // Execute
        await controller.getAvailablePokemonsWithPriceFromStore(storeId, <Response><any>res);

        // Assert
        Sinon.assert.calledOnceWithMatch(usecase.execute, input);
        Sinon.assert.calledOnce(fakePresenter.present);
        Sinon.assert.calledOnceWithMatch(res.status().json, presenterOutput)
    })

    it('should call presenter.presentOnError if catches an error', async () => {
        // Fakes and stub usecase throwing error
        usecase.execute.throws();
        const res = {
            status: fake.returns({
                json: fake.returns({}),
            }),
        };
        const storeId = "someId"
        const input = {
            storeId: storeId
        }
        // Stub presenter returns predictable output for presentOnError
        // Need to stub all methods
        const stubPresenter = new GetQuantityOfPokemonAvailableInStoreAndPricePresenter();
        Sinon.stub(stubPresenter, "presentOnError").returns([500, { error: "this is an error"}]);
        Sinon.stub(stubPresenter, "present").returns(null);
        controller.presenter = stubPresenter;

        // Execute function
        await controller.getAvailablePokemonsWithPriceFromStore(storeId, <Response><any>res);

        // Expect
        Sinon.assert.calledOnceWithMatch(usecase.execute, input);
        Sinon.assert.calledOnce(<any>stubPresenter.presentOnError);
        Sinon.assert.notCalled(<any>stubPresenter.present);

    })

    it('should return error code and response from presenter presentOnError if an error is thrown', async () => {
        // Fakes and stub presenter throwing error

        // usecase will throw error
        usecase.execute.throws();
        // stubbed presenter with predicted presentOnError res
        const stubPresenter = new GetQuantityOfPokemonAvailableInStoreAndPricePresenter();
        const statusCode = 403;
        const errorResponse = { error: "this is an error"};
        Sinon.stub(stubPresenter, "presentOnError").returns([statusCode, errorResponse]);
        Sinon.stub(stubPresenter, "present").returns(null);
        controller.presenter = stubPresenter;
        // stubbed api Response
        const res = {
            status: fake.returns({
                json: fake.returns({}),
            }),
        };

        // inputs & outputs
        const storeId = "someId"
        const input = {
            storeId: storeId
        }
        

        // Execute function
        await controller.getAvailablePokemonsWithPriceFromStore(storeId, <Response><any>res);

        // Expect
        Sinon.assert.calledOnceWithMatch(res.status, statusCode);
        Sinon.assert.calledOnceWithMatch(res.status().json, errorResponse);
    })

})

