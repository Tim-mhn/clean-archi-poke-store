import { Service } from "typedi";
import { GetShoppingCartContentPriceAndReadyDateOutput } from "../../domain/usecases/getShoppingCartContentPriceAndReadyDate.usecase";

@Service()
export class GetShoppingCartContentPriceAndReadyDatePresenter {
    constructor () {

    }

    present(input: GetShoppingCartContentPriceAndReadyDateOutput) {
        return {
            pokemons: input.pokemons,
            cartPrice: input.price,
            readyDate: input.readyDate,
            cartId: input.shoppingCartId
        }
    }
}   