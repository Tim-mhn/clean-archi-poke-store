import 'reflect-metadata' // Don't forget to import this for each Controller
import {
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    QueryParam,
} from 'routing-controllers'
import { Inject, Service } from 'typedi'
import { AbstractPokemonRepository } from '../../domain/repositories/pokemon.repository'
import { AbstractShoppingCartRepository } from '../../domain/repositories/shoppingCart.repository'
import { AbstractStoreRepository } from '../../domain/repositories/store.repository'
import {
    AddPokemonToShoppingCartInput,
    AddPokemonToShoppingCartUseCase,
} from '../../domain/usecases/addPokemonToShoppingCart.useCase'
import {
    CreateEmptyShoppingCartInput,
    CreateEmptyShoppingCartUseCase,
} from '../../domain/usecases/createEmptyShoppingCart.useCase'
import {
    RemovePokemonFromShoppingCartInput,
    RemovePokemonFromShoppingCartUseCase,
} from '../../domain/usecases/removePokemonFromShoppingCart.useCase'
import { CreateEmptyShoppingCartPresenter } from '../presenters/createEmptyShoppingCart.presenter'
import { PokemonRepositoryProxy } from '../repositoryProxies/pokemonRepository.proxy'
import { ShoppingCartRepositoryProxy } from '../repositoryProxies/shoppingCartRepository.proxy'
import { StoreRepositoryProxy } from '../repositoryProxies/storeRepository.proxy'
import bodyParser = require('body-parser')

@JsonController('/shopping-cart')
@Service()
export class ShoppingCartController {
    constructor(
        @Inject(ShoppingCartRepositoryProxy.getInstance)
        private readonly shoppingCartRepository: AbstractShoppingCartRepository,
        @Inject(() => CreateEmptyShoppingCartPresenter)
        @Inject(PokemonRepositoryProxy.getInstance)
        private readonly pokemonRepository: AbstractPokemonRepository,
        @Inject(StoreRepositoryProxy.getInstance)
        private readonly storeRepository: AbstractStoreRepository,

        private readonly createEmptyShoppingCartPresenter: CreateEmptyShoppingCartPresenter,
        private readonly createEmptyShoppingCartUseCase: CreateEmptyShoppingCartUseCase,
        private readonly addPokemonToShoppingCartUseCase: AddPokemonToShoppingCartUseCase,
        private readonly removePokemonFromShoppingCartUseCase: RemovePokemonFromShoppingCartUseCase
    ) {
        this.createEmptyShoppingCartUseCase = new CreateEmptyShoppingCartUseCase(
            shoppingCartRepository,
            storeRepository
        )
        this.createEmptyShoppingCartPresenter = createEmptyShoppingCartPresenter
        this.addPokemonToShoppingCartUseCase = new AddPokemonToShoppingCartUseCase(
            shoppingCartRepository,
            pokemonRepository
        )
        this.removePokemonFromShoppingCartUseCase = new RemovePokemonFromShoppingCartUseCase(
            shoppingCartRepository,
            pokemonRepository
        )
    }

    @Post('/:shoppingCartId/pokemon/:pokemonId')
    async addPokemonToShoppingCart(
        @Param('pokemonId') pokemonId: string,
        @Param('shoppingCartId') shoppingCartId: string
    ) {
        const input: AddPokemonToShoppingCartInput = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        }
        const useCaseOutput = await this.addPokemonToShoppingCartUseCase.execute(
            input
        )
        return useCaseOutput
    }

    @Delete('/:shoppingCartId/pokemon/:pokemonId')
    async removePokemonFromShoppingCart(
        @Param('pokemonId') pokemonId: string,
        @Param('shoppingCartId') shoppingCartId: string
    ) {
        const input: RemovePokemonFromShoppingCartInput = {
            pokemonId: pokemonId,
            shoppingCartId: shoppingCartId,
        }
        const useCaseOutput = await this.removePokemonFromShoppingCartUseCase.execute(
            input
        )
        return useCaseOutput
    }
    @Post()
    async createEmptyShoppingCart(@QueryParam('storeId') storeId: string) {
        console.log(storeId)
        const useCaseInput: CreateEmptyShoppingCartInput = {
            storeId: storeId,
        }
        const useCaseOutput = await this.createEmptyShoppingCartUseCase.execute(
            useCaseInput
        )
        return this.createEmptyShoppingCartPresenter.present(useCaseOutput)
    }

    @Get('/:shoppingCartId')
    async getShoppingCartDetails() {}
}
