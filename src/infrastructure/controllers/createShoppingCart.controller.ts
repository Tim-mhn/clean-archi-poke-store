import { BodyParam, Get, JsonController, Param, QueryParam, Res } from "routing-controllers";
import "reflect-metadata" // Don't forget to import this for each Controller
import bodyParser = require("body-parser");
import { Inject, Service } from "typedi";
import { Pokemon, PokemonType } from "../../domain/entities/pokemon.entity";
import { IPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { GetQuantityOfPokemonAvailableInStoreAndPriceInput, GetQuantityOfPokemonAvailableInStoreAndPriceUseCase } from "../../domain/usecases/getQuantityOfPokemonAvailableInStoreAndPrice.usecase";
import { GetQuantityOfPokemonAvailableInStoreAndPricePresenter } from "../presenters/getQuantityOfPokemonAvailableInStoreAndPrice.presenter";
import { Response } from "express";
import { PokemonRepositoryProxy } from "../repositoryProxies/pokemonRepository.proxy";
import { CalculatePokemonPriceUseCase } from "../../domain/usecases/calculatePokemonPrice.useCase";
import { StoreRepositoryProxy } from "../repositoryProxies/storeRepository.proxy";
import { IStoreRepository } from "../../domain/repositories/store.repository";
import { ShoppingCartRepositoryProxy } from "../repositoryProxies/shoppingCartRepository.proxy";

@JsonController('/shopping-cart')
@Service()
export class createShoppingCartController {
    constructor(
        @Inject(ShoppingCartRepositoryProxy.getInstance) private readonly pokemonRepository: IPokemonRepository,
        @Inject(() => GetQuantityOfPokemonAvailableInStoreAndPricePresenter) private readonly presenter: GetQuantityOfPokemonAvailableInStoreAndPricePresenter,
        private readonly getQuantityOfPokemonAvailableInStoreAndPriceUseCase: GetQuantityOfPokemonAvailableInStoreAndPriceUseCase,
        private readonly calculatePokemonPriceUseCase: CalculatePokemonPriceUseCase
    ) {
        this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase = new GetQuantityOfPokemonAvailableInStoreAndPriceUseCase(pokemonRepository, storeRepository, calculatePokemonPriceUseCase);
        this.presenter = presenter;
    }

    @Get('/:storeId')
    async getAvailablePokemonsWithPriceFromStore(@Param('storeId') storeId: string) {
        const input: GetQuantityOfPokemonAvailableInStoreAndPriceInput = {
            storeId: storeId
        }
        const useCaseOutput = await this.getQuantityOfPokemonAvailableInStoreAndPriceUseCase.execute(input);
        return this.presenter.present(useCaseOutput)

    }


}

