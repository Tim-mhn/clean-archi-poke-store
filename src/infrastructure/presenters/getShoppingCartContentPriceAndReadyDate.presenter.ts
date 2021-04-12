import { Service } from "typedi";
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
    const statusCode = 500;
    const errorMessage =
      "Unhandled error when getting shopping cart info (content, price, ready date)";
    return [statusCode, { error: errorMessage }];
  }
}
