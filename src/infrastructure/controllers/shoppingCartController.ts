import "reflect-metadata"; // Don't forget to import this for each Controller
import { Get, JsonController, Param, Post, Res } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AbstractPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { AbstractShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";
import {
    AddPokemonToShoppingCartInput,
    AddPokemonToShoppingCartUseCase,
} from "../../domain/usecases/addPokemonToShoppingCart.useCase";
import { CreateEmptyShoppingCartUseCase } from "../../domain/usecases/createEmptyShoppingCart.useCase";
import { CreateEmptyShoppingCartPresenter } from "../presenters/createEmptyShoppingCart.presenter";
import { PokemonRepositoryProxy } from "../repositoryProxies/pokemonRepository.proxy";
import { ShoppingCartRepositoryProxy } from "../repositoryProxies/shoppingCartRepository.proxy";
import bodyParser = require("body-parser");
import {
    RemovePokemonFromShoppingCartInput,
    RemovePokemonFromShoppingCartUseCase
} from "../../domain/usecases/removePokemonFromShoppingCart.useCase";
import { GetShoppingCartContentPriceAndReadyDateOutput, GetShoppingCartContentPriceAndReadyDateUseCase } from "../../domain/usecases/getShoppingCartContentPriceAndReadyDate.usecase";
import { GetShoppingCartContentPriceAndReadyDatePresenter } from "../presenters/getShoppingCartContentPriceAndReadyDate.presenter";
import { Response } from "express";

@JsonController("/shopping-cart")
@Service()
export class ShoppingCartController {
    getShoppingCartContentPriceAndReadyDateUseCase: GetShoppingCartContentPriceAndReadyDateUseCase;
    constructor(
        @Inject(ShoppingCartRepositoryProxy.getInstance)
        private readonly shoppingCartRepository: AbstractShoppingCartRepository,
        @Inject(() => CreateEmptyShoppingCartPresenter)
        @Inject(PokemonRepositoryProxy.getInstance)
        private readonly pokemonRepository: AbstractPokemonRepository,

        private readonly createEmptyShoppingCartPresenter: CreateEmptyShoppingCartPresenter,
        private readonly getShoppingCartContentPriceAndReadyDatePresenter: GetShoppingCartContentPriceAndReadyDatePresenter,
        private readonly createEmptyShoppingCartUseCase: CreateEmptyShoppingCartUseCase,
        private readonly addPokemonToShoppingCartUseCase: AddPokemonToShoppingCartUseCase,
        private readonly removePokemonFromShoppingCartUseCase: RemovePokemonFromShoppingCartUseCase,

    ) {
        this.getShoppingCartContentPriceAndReadyDateUseCase = new GetShoppingCartContentPriceAndReadyDateUseCase(shoppingCartRepository);
        this.createEmptyShoppingCartUseCase = new CreateEmptyShoppingCartUseCase(
            shoppingCartRepository
        );
        this.createEmptyShoppingCartPresenter = createEmptyShoppingCartPresenter;
        this.addPokemonToShoppingCartUseCase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepository,
            pokemonRepository
        );
        this.removePokemonFromShoppingCartUseCase = new RemovePokemonFromShoppingCartUseCase(
            shoppingCartRepository,
            pokemonRepository
        );
    }

    @Post()
    async createEmptyShoppingCart() {
        const useCaseOutput = await this.createEmptyShoppingCartUseCase.execute();
        return this.createEmptyShoppingCartPresenter.present(useCaseOutput);
    }

    @Post("/add/:shoppingCartId/pokemon/:pokemonId")
    async addPokemonToShoppingCart(
        @Param("pokemonId") pokemonId: string,
        @Param("shoppingCartId") shoppingCartId: string
    ) {
        const input: AddPokemonToShoppingCartInput = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        };
        const useCaseOutput = await this.addPokemonToShoppingCartUseCase.execute(
            input
        );
        return useCaseOutput;
    }

    @Post("/remove/:shoppingCartId/pokemon/:pokemonId")
    async removePokemonFromShoppingCart(
        @Param("pokemonId") pokemonId: string,
        @Param("shoppingCartId") shoppingCartId: string
    ) {
        const input: RemovePokemonFromShoppingCartInput = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        };
        const useCaseOutput = await this.removePokemonFromShoppingCartUseCase.execute(
            input
        );
        return useCaseOutput;
    }

    @Get("/:shoppingCartId")
    async getShoppingCartDetails(
        @Param("shoppingCartId") shoppingCartId: string,
        @Res() response: Response,
    ) {
        try {
            const output: GetShoppingCartContentPriceAndReadyDateOutput = await this.getShoppingCartContentPriceAndReadyDateUseCase.execute({ shoppingCartId, now: new Date() });
            const formattedResponse = this.getShoppingCartContentPriceAndReadyDatePresenter.present(output);
            return response.status(200).json(formattedResponse);
        } catch (e) {
            console.log(e);
            return response.status(500).json({ error: "unhandled error" });
        }

    }

}
