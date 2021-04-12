import chai, { expect } from "chai";
import { Response } from "express";
import Sinon, { fake } from "sinon";
import sinonChai from "sinon-chai";
import { AbstractPokemonRepository } from "../../../src/domain/repositories/pokemon.repository";
import { AbstractShoppingCartRepository } from "../../../src/domain/repositories/shoppingCart.repository";
import { AbstractStoreRepository } from "../../../src/domain/repositories/store.repository";
import { AddPokemonToShoppingCartUseCase } from "../../../src/domain/usecases/addPokemonToShoppingCart.useCase";
import { CreateEmptyShoppingCartUseCase } from "../../../src/domain/usecases/createEmptyShoppingCart.useCase";
import { GetShoppingCartContentPriceAndReadyDateUseCase } from "../../../src/domain/usecases/getShoppingCartContentPriceAndReadyDate.usecase";
import { RemovePokemonFromShoppingCartUseCase } from "../../../src/domain/usecases/removePokemonFromShoppingCart.useCase";
import { ShoppingCartController } from "../../../src/infrastructure/controllers/shoppingCart.controller";
import { AddPokemonToShoppingCartPresenter } from "../../../src/infrastructure/presenters/addPokemonToShoppingCart.presenter";
import { CreateEmptyShoppingCartPresenter } from "../../../src/infrastructure/presenters/createEmptyShoppingCart.presenter";
import { GetQuantityOfPokemonAvailableInStoreAndPricePresenter } from "../../../src/infrastructure/presenters/getQuantityOfPokemonAvailableInStoreAndPrice.presenter";
import { GetShoppingCartContentPriceAndReadyDatePresenter } from "../../../src/infrastructure/presenters/getShoppingCartContentPriceAndReadyDate.presenter";
import { PokemonRepositoryProxy } from "../../../src/infrastructure/repositoryProxies/pokemonRepository.proxy";
import { ShoppingCartRepositoryProxy } from "../../../src/infrastructure/repositoryProxies/shoppingCartRepository.proxy";
import { StoreRepositoryProxy } from "../../../src/infrastructure/repositoryProxies/storeRepository.proxy";

chai.use(sinonChai);
let createEmptyShoppingCartPresenter;
let createEmptyShoppingCartUseCase;
let addPokemonToShoppingCartPresenter;
let getShoppingCartContentPriceAndReadyDatePresenter;
let addPokemonToShoppingCartUseCase;
let removePokemonFromShoppingCartUseCase;
let shoppingCartRepo;
let pokeRepo;
let storeRepo;
let usecase;
let controller;

describe("ShoppingCartController @Post :shoppingCartId/pokemon/:pokemonId endpoint", () => {
  beforeEach(() => {
    createEmptyShoppingCartPresenter = Sinon.createStubInstance(
      GetQuantityOfPokemonAvailableInStoreAndPricePresenter
    );
    addPokemonToShoppingCartPresenter = Sinon.createStubInstance(
      AddPokemonToShoppingCartPresenter
    );
    getShoppingCartContentPriceAndReadyDatePresenter = Sinon.createStubInstance(
      GetShoppingCartContentPriceAndReadyDatePresenter
    );
    shoppingCartRepo = Sinon.createStubInstance(
      ShoppingCartRepositoryProxy.getInstance()
    );
    pokeRepo = Sinon.createStubInstance(PokemonRepositoryProxy.getInstance());
    storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());

    usecase = Sinon.createStubInstance(AddPokemonToShoppingCartUseCase);
    controller = new ShoppingCartController(
      (shoppingCartRepo as unknown) as AbstractShoppingCartRepository,
      (pokeRepo as unknown) as AbstractPokemonRepository,
      (storeRepo as unknown) as AbstractStoreRepository,
      (getShoppingCartContentPriceAndReadyDatePresenter as unknown) as GetShoppingCartContentPriceAndReadyDatePresenter,
      (createEmptyShoppingCartPresenter as unknown) as CreateEmptyShoppingCartPresenter,
      (createEmptyShoppingCartUseCase as unknown) as CreateEmptyShoppingCartUseCase,
      (addPokemonToShoppingCartPresenter as unknown) as AddPokemonToShoppingCartPresenter,
      (addPokemonToShoppingCartUseCase as unknown) as AddPokemonToShoppingCartUseCase,
      (removePokemonFromShoppingCartUseCase as unknown) as RemovePokemonFromShoppingCartUseCase
    );

    controller.addPokemonToShoppingCartUseCase = <
      AddPokemonToShoppingCartUseCase
    >(<any>usecase);
  });
  it("should call usecase execute, presenter present and response status 200 if no error are thrown", async () => {
    // Fakes and stubs
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };
    const pokemonId = "somePokemonId";
    const shoppingCartId = "someShoppingCartId";

    const input = {
      pokemonId: pokemonId,
      shoppingCartId: shoppingCartId,
    };

    // Execute
    await controller.addPokemonToShoppingCart(
      pokemonId,
      shoppingCartId,
      <Response>(<any>res)
    );

    // Assert
    Sinon.assert.calledOnceWithMatch(usecase.execute, input);
    Sinon.assert.calledOnce(addPokemonToShoppingCartPresenter.present);
    Sinon.assert.calledOnceWithMatch(res.status, 200);
  });

  it("should return the output of present in response if no error are thrown", async () => {
    // Fakes and stubs
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };
    const pokemonId = "somePokemonId";
    const shoppingCartId = "someShoppingCartId";

    const input = {
      pokemonId: pokemonId,
      shoppingCartId: shoppingCartId,
    };

    const presenterOutput = {
      a: 1,
    };
    const fakePresenter = {
      present: fake.returns(presenterOutput),
    };
    controller.addPokemonToShoppingCartPresenter = fakePresenter;

    // Execute
    await controller.addPokemonToShoppingCart(
      pokemonId,
      shoppingCartId,
      <Response>(<any>res)
    );

    // Assert
    Sinon.assert.calledOnceWithMatch(usecase.execute, input);
    Sinon.assert.calledOnce(fakePresenter.present);
    Sinon.assert.calledOnceWithMatch(res.status().json, presenterOutput);
  });

  it("should call presenter.presentOnError if catches an error", async () => {
    // Fakes and stub usecase throwing error
    usecase.execute.throws();
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };
    const pokemonId = "somePokemonId";
    const shoppingCartId = "someShoppingCartId";

    const input = {
      pokemonId: pokemonId,
      shoppingCartId: shoppingCartId,
    };
    // Stub presenter returns predictable output for presentOnError
    // Need to stub all methods
    const stubPresenter = new AddPokemonToShoppingCartPresenter();
    Sinon.stub(stubPresenter, "presentOnError").returns([
      500,
      { error: "this is an error" },
    ]);
    Sinon.stub(stubPresenter, "present").returns(null);
    controller.addPokemonToShoppingCartPresenter = stubPresenter;

    // Execute
    await controller.addPokemonToShoppingCart(
      pokemonId,
      shoppingCartId,
      <Response>(<any>res)
    );

    // Expect
    Sinon.assert.calledOnceWithMatch(usecase.execute, input);
    Sinon.assert.calledOnce(<any>stubPresenter.presentOnError);
    Sinon.assert.notCalled(<any>stubPresenter.present);
  });

  it("should return error code and response from presenter presentOnError if an error is thrown", async () => {
    // Fakes and stub presenter throwing error

    // usecase will throw error
    usecase.execute.throws();
    // stubbed presenter with predicted presentOnError res
    const stubPresenter = new AddPokemonToShoppingCartPresenter();
    const statusCode = 403;
    const errorResponse = { error: "this is an error" };
    Sinon.stub(stubPresenter, "presentOnError").returns([
      statusCode,
      errorResponse,
    ]);
    Sinon.stub(stubPresenter, "present").returns(null);
    controller.addPokemonToShoppingCartPresenter = stubPresenter;
    // stubbed api Response
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };

    // inputs & outputs
    const pokemonId = "somePokemonId";
    const shoppingCartId = "someShoppingCartId";

    const input = {
      pokemonId: pokemonId,
      shoppingCartId: shoppingCartId,
    };

    // Execute
    await controller.addPokemonToShoppingCart(
      pokemonId,
      shoppingCartId,
      <Response>(<any>res)
    );

    // Expect
    Sinon.assert.calledOnceWithMatch(res.status, statusCode);
    Sinon.assert.calledOnceWithMatch(res.status().json, errorResponse);
  });
});

describe("Shopping Cart Controller - @Get ShoppingCartDetails (content, price, estimatedReadyDate", () => {
  beforeEach(() => {
    createEmptyShoppingCartPresenter = Sinon.createStubInstance(
      GetQuantityOfPokemonAvailableInStoreAndPricePresenter
    );
    addPokemonToShoppingCartPresenter = Sinon.createStubInstance(
      AddPokemonToShoppingCartPresenter
    );
    getShoppingCartContentPriceAndReadyDatePresenter = Sinon.createStubInstance(
      GetShoppingCartContentPriceAndReadyDatePresenter
    );
    shoppingCartRepo = Sinon.createStubInstance(
      ShoppingCartRepositoryProxy.getInstance()
    );
    pokeRepo = Sinon.createStubInstance(PokemonRepositoryProxy.getInstance());
    storeRepo = Sinon.createStubInstance(StoreRepositoryProxy.getInstance());

    usecase = Sinon.createStubInstance(
      GetShoppingCartContentPriceAndReadyDateUseCase
    );

    controller = new ShoppingCartController(
      (shoppingCartRepo as unknown) as AbstractShoppingCartRepository,
      (pokeRepo as unknown) as AbstractPokemonRepository,
      (storeRepo as unknown) as AbstractStoreRepository,
      (getShoppingCartContentPriceAndReadyDatePresenter as unknown) as GetShoppingCartContentPriceAndReadyDatePresenter,
      ({} as unknown) as CreateEmptyShoppingCartPresenter,
      ({} as unknown) as CreateEmptyShoppingCartUseCase,
      ({} as unknown) as AddPokemonToShoppingCartPresenter,
      ({} as unknown) as AddPokemonToShoppingCartUseCase,
      ({} as unknown) as RemovePokemonFromShoppingCartUseCase
    );

    controller.getShoppingCartContentPriceAndReadyDateUseCase = <
      GetShoppingCartContentPriceAndReadyDateUseCase
    >(<any>usecase);
  });

  it("should call usecase execute function and presenter present function is no errors are thrown", async () => {
    const shoppingCartId = "some_id";
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };

    await(
      <ShoppingCartController>controller
    ).getShoppingCartContentPriceAndReadyDate(
      shoppingCartId,
      new Date(),
      <any>res
    );

    expect(controller.getShoppingCartContentPriceAndReadyDateUseCase.execute).to
      .be.calledOnce;
    expect(controller.getShoppingCartContentPriceAndReadyDatePresenter.present)
      .to.be.calledOnce;
  });

  it("should return a 200 status if no errors are thrown", async () => {
    const shoppingCartId = "some_id";
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };

    await (<ShoppingCartController>(
      controller
    )).getShoppingCartContentPriceAndReadyDate(shoppingCartId, new Date(), <any>res);

    expect(res.status).to.be.calledOnceWith(200);
  });

  it("should return presenter output as a json from Response", async () => {
    const shoppingCartId = "some_id";
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };

    const presenterOutput = { a: "1" };
    getShoppingCartContentPriceAndReadyDatePresenter = new GetShoppingCartContentPriceAndReadyDatePresenter();
    Sinon.stub(
      getShoppingCartContentPriceAndReadyDatePresenter,
      "present"
    ).returns(presenterOutput);
    controller.getShoppingCartContentPriceAndReadyDatePresenter = getShoppingCartContentPriceAndReadyDatePresenter;

    await(
      <ShoppingCartController>controller
    ).getShoppingCartContentPriceAndReadyDate(
      shoppingCartId,
      new Date(),
      <any>res
    );

    expect(res.status().json).to.be.calledOnceWith(presenterOutput);
  });

  it("should call presenter's formatOnError if it catches an error in try block", async () => {
    const shoppingCartId = "some_id";
    const res = {
      status: fake.returns({
        json: fake.returns({}),
      }),
    };
    // Mock presenter
    const presenterOutput = { a: "1" };
    const presenterOnErrorOutput = [500, { error: "error message" }];
    getShoppingCartContentPriceAndReadyDatePresenter = new GetShoppingCartContentPriceAndReadyDatePresenter();
    Sinon.stub(
      getShoppingCartContentPriceAndReadyDatePresenter,
      "present"
    ).returns(presenterOutput);
    Sinon.stub(
      getShoppingCartContentPriceAndReadyDatePresenter,
      "presentOnError"
    ).returns(presenterOnErrorOutput);
    // Mock usecase will throw
    usecase = {
      execute: fake.throws("use case threw error !"),
    };

    controller.getShoppingCartContentPriceAndReadyDatePresenter = getShoppingCartContentPriceAndReadyDatePresenter;
    controller.getShoppingCartContentPriceAndReadyDateUseCase = usecase;

    // Execute call
    await(
      <ShoppingCartController>controller
    ).getShoppingCartContentPriceAndReadyDate(
      shoppingCartId,
      new Date(),
      <any>res
    );

    expect(
      controller.getShoppingCartContentPriceAndReadyDatePresenter.presentOnError
    ).to.be.calledOnce;
    expect(res.status).to.be.calledOnceWithExactly(presenterOnErrorOutput[0]);
    expect(res.status().json).to.be.calledOnceWithExactly(
      presenterOnErrorOutput[1]
    );
  });
});
