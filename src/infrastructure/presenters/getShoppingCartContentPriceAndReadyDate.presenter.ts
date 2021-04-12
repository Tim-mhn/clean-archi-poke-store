import e from "express";
import { Service } from "typedi";
import { ShoppingCartNotFoundError } from "../../domain/errors/shoppingCart.errors";
import { GetShoppingCartContentPriceAndReadyDateOutput } from "../../domain/usecases/getShoppingCartContentPriceAndReadyDate.usecase";

@Service()
export class GetShoppingCartContentPriceAndReadyDatePresenter {
  constructor() {}

  present(input: GetShoppingCartContentPriceAndReadyDateOutput) {
    const formattedPokemonsWithPrice = input.pokemons.map((pokePriceQty) => {
      return {
        pokemon: {
          id: pokePriceQty.pokemon.id,
          name: pokePriceQty.pokemon.name,
        },
        unitPrice: pokePriceQty.price,
        quantity: pokePriceQty.quantity,
      };
    });
    return {
      pokemons: formattedPokemonsWithPrice,
      cartPrice: input.price,
      readyDate: input.readyDate,
      cartId: input.shoppingCartId,
    };
  }

  presentOnError(error: Error) {
    let statusCode = 500;
    let errorMessage =
      "Unhandled error when getting shopping cart info (content, price, ready date)";
    if (error instanceof ShoppingCartNotFoundError) {
      statusCode = 403;
      errorMessage = error.message;
    }

    return [statusCode, { error: errorMessage }];
  }
}
