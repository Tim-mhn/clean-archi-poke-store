import { Response } from "express";
import "reflect-metadata" // Don't forget to import this for each Controller
import { BodyParam, JsonController, Param, Post, Res } from "routing-controllers";
import { Inject, Service } from "typedi";
import { PokemonInCart } from "../../domain/entities/shoppingCart.entity";
import { AbstractShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";
import { CheckoutUseCase } from "../../domain/usecases/checkout.useCase";
import { ShoppingCartRepositoryProxy } from "../repositoryProxies/shoppingCartRepository.proxy";
import { StoreRepositoryProxy } from "../repositoryProxies/storeRepository.proxy";

@JsonController('/checkout')
@Service()
export class CheckoutController {
    checkoutUseCase: CheckoutUseCase;
    constructor(
        @Inject(ShoppingCartRepositoryProxy.getInstance)
        shoppingCartRepository: AbstractShoppingCartRepository,
        @Inject(StoreRepositoryProxy.getInstance)
        storeRepository: AbstractStoreRepository) {
        this.checkoutUseCase = new CheckoutUseCase(shoppingCartRepository, storeRepository);
    }


    @Post()
    async checkoutShoppingCartAndUpdateStoreStocks(
        @BodyParam('shoppingCartId') shoppingCartId: string,
        @BodyParam('cardOwner') cardOwner: string,
        @BodyParam('cardCVV') cardCVV: string,
        @BodyParam('cardNumber') cardNumber: string,
        @Res() response: Response
    ) {
        try {
            const checkoutResponse: { storeId, shoppingCartId, pokemonsInCart: PokemonInCart[]} = await this.checkoutUseCase.execute(shoppingCartId, cardOwner, cardNumber, cardCVV);
            return response.status(200).json(checkoutResponse);
        } catch (e) {
            console.error(e);
            return response.status(500).json({ error: e.message })
        }
    }
}