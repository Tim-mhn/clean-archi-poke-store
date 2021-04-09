import "reflect-metadata"; // Don't forget to import this for each Controller
import { JsonController, Param, Post } from "routing-controllers";
import { Inject, Service } from "typedi";
import { AbstractPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";
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

@JsonController("/shopping-cart")
@Service()
export class ShoppingCartController {
  constructor(
    @Inject(ShoppingCartRepositoryProxy.getInstance)
    private readonly shoppingCartRepository: IShoppingCartRepository,
    @Inject(() => CreateEmptyShoppingCartPresenter)
    @Inject(PokemonRepositoryProxy.getInstance)
    private readonly pokemonRepository: AbstractPokemonRepository,

    private readonly createEmptyShoppingCartPresenter: CreateEmptyShoppingCartPresenter,
    private readonly createEmptyShoppingCartUseCase: CreateEmptyShoppingCartUseCase,
    private readonly addPokemonToShoppingCartUseCase: AddPokemonToShoppingCartUseCase,
    private readonly removePokemonFromShoppingCartUseCase: RemovePokemonFromShoppingCartUseCase

  ) {
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

}
