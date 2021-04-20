import { BodyParam, Get, JsonController, Param, Post, QueryParam, Res } from "routing-controllers";
import "reflect-metadata" // Don't forget to import this for each Controller
import bodyParser = require("body-parser");
import { Inject, Service } from "typedi";
import { Pokemon, PokemonType } from "../../domain/entities/pokemon.entity";
import { AbstractPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { GetQuantityOfPokemonAvailableInStoreAndPriceInput, GetQuantityOfPokemonAvailableInStoreAndPriceUseCase } from "../../domain/usecases/getQuantityOfPokemonAvailableInStoreAndPrice.usecase";
import { GetQuantityOfPokemonAvailableInStoreAndPricePresenter } from "../presenters/getQuantityOfPokemonAvailableInStoreAndPrice.presenter";
import { Response } from "express";
import { PokemonRepositoryProxy } from "../repositoryProxies/pokemonRepository.proxy";
import { CalculatePokemonPriceUseCase } from "../../domain/usecases/calculatePokemonPrice.useCase";
import { StoreRepositoryProxy } from "../repositoryProxies/storeRepository.proxy";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";
import { GetAllStoresBasicInformationsUseCase } from "../../domain/usecases/getAllStoresBasicInformations.useCase";
import { sleep } from "../utils/dev.util";

@JsonController('/stores')
@Service()
export class PokemonsInStoreController {
    private readonly getQuantityOfPokemonAvailableInStoreAndPriceUseCase;
    private readonly presenter;
    private readonly getAllStoresBasicInformationsUseCase: GetAllStoresBasicInformationsUseCase;
    constructor(
        @Inject(PokemonRepositoryProxy.getInstance) pokemonRepository: AbstractPokemonRepository,
        @Inject(StoreRepositoryProxy.getInstance) storeRepository: AbstractStoreRepository,
        @Inject(() => GetQuantityOfPokemonAvailableInStoreAndPricePresenter) presenter: GetQuantityOfPokemonAvailableInStoreAndPricePresenter,
    ) {
        this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepository, storeRepository, new CalculatePokemonPriceUseCase());
        this.presenter = presenter;
        this.getAllStoresBasicInformationsUseCase = new GetAllStoresBasicInformationsUseCase(storeRepository);
    }

    @Get()
    public async getAllStores(@Res() response: Response) {
        try {
            await sleep(1000);
            const allStores = await this.getAllStoresBasicInformationsUseCase.execute();
            const formattedAllStores = this.presenter.presentAllStores(allStores);
            return response.status(200).json(formattedAllStores);
        } catch (e) {
            console.error(e);
            return response.status(500).json({error: e.message});
        }
    }
    @Get('/:storeId/pokemons')
    public async getAvailablePokemonsWithPriceFromStore(
        @Param('storeId') storeId: string,
        @Res() response: Response) {
        const input: GetQuantityOfPokemonAvailableInStoreAndPriceInput = {
            storeId: storeId
        }
        try {
            const useCaseOutput = await this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase.execute(input);
            console.log('use case output', useCaseOutput)
            const formattedResponse = this.presenter.present(useCaseOutput)
            return response.status(200).json(formattedResponse);
        } catch (e) {
            console.error(e);
            const [statusCode, formattedErrorResponse] = this.presenter.presentOnError(e);
            return response.status(statusCode).json(formattedErrorResponse);
        }

    }



}

