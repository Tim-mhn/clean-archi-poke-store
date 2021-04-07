import { BodyParam, Get, JsonController, Param, Post, QueryParam, Res } from "routing-controllers";
import "reflect-metadata" // Don't forget to import this for each Controller
import bodyParser = require("body-parser");
import { Inject, Service } from "typedi";
import { CreateEmptyShoppingCartPresenter } from "../presenters/createEmptyShoppingCart.presenter";
import { CreateEmptyShoppingCartUseCase } from "../../domain/usecases/createEmptyShoppingCart.useCase";
import { ShoppingCartRepositoryProxy } from "../repositoryProxies/shoppingCartRepository.proxy";
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";

@JsonController('/shopping-cart')
@Service()
export class ShoppingCartController {
    constructor(
        @Inject(ShoppingCartRepositoryProxy.getInstance) private readonly shoppingCartRepository: IShoppingCartRepository,
        @Inject(() => CreateEmptyShoppingCartPresenter) private readonly presenter: CreateEmptyShoppingCartPresenter,
        private readonly createEmptyShoppingCartUseCase: CreateEmptyShoppingCartUseCase
    ) {
        this.createEmptyShoppingCartUseCase = new CreateEmptyShoppingCartUseCase(shoppingCartRepository);
        this.presenter = presenter;
    }

    @Post()
    async createEmptyShoppingCart() {
        const useCaseOutput = await this.createEmptyShoppingCartUseCase.execute();
        return this.presenter.present(useCaseOutput)
    }
}

