import { BodyParam, Get, JsonController, Param, QueryParam, Res } from "routing-controllers";
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

@JsonController('/pokemons-in-store')
@Service()
export class PokemonsInStoreController {
    private readonly getQuantityOfPokemonAvailableInStoreAndPriceUseCase;
    private readonly presenter;
    constructor(
        @Inject(PokemonRepositoryProxy.getInstance) pokemonRepository: AbstractPokemonRepository,
        @Inject(StoreRepositoryProxy.getInstance) storeRepository: AbstractStoreRepository,
        @Inject(() => GetQuantityOfPokemonAvailableInStoreAndPricePresenter) presenter: GetQuantityOfPokemonAvailableInStoreAndPricePresenter,
    ) {
        this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepository, storeRepository, new CalculatePokemonPriceUseCase());
        this.presenter = presenter;
    }

    @Get('/:storeId')
    public async getAvailablePokemonsWithPriceFromStore(
        @Param('storeId') storeId: string,
        @Res() response: Response) {
        const input: GetQuantityOfPokemonAvailableInStoreAndPriceInput = {
            storeId: storeId
        }
        try {
            const useCaseOutput = await this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase.execute(input);
            const formattedResponse = this.presenter.present(useCaseOutput)
            return response.status(200).json(formattedResponse);
        } catch (e) {
            return response.status(500).json({ error: "error" });
        }

    }


}

