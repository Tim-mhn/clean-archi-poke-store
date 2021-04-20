import { PokemonInCart } from "../interfaces/pokemon-in-cart.interface";
import { Pokemon } from "../interfaces/pokemon.interface";

export interface CheckoutInputDTO {
    shoppingCartId: string;
    cardOwner: string;
    cardCVV: string;
    cardNumber: string;
}

export interface CheckoutOutputDTO {
    shoppingCartId: string;
    storeId: string;
    pokemonsInCart: PokemonInCart[];
}