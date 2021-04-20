import { Service } from "typedi";
import { PokemonInCart } from "../entities/shoppingCart.entity";
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository";
import { AbstractStoreRepository } from "../repositories/store.repository";

@Service()
export class CheckoutUseCase {
    public constructor(public _shoppingCartRepo: AbstractShoppingCartRepository,
        public _storeRepo: AbstractStoreRepository) {
        this._shoppingCartRepo = _shoppingCartRepo;
        this._storeRepo = _storeRepo;
    }

    public async execute(shoppingCartId: string, cardOwner: string, cardNumber: string, cardCVV: string) {
        const pokemonsInCart = await this._shoppingCartRepo.getShoppingCartDetails(shoppingCartId);
        const storeId = await this._checkIfPokemonsInStoreAndReturnStoreId(shoppingCartId, pokemonsInCart);
        await this._validateCardCredentials(cardOwner, cardNumber, cardCVV);
        await this._updateStoreWithBoughtPokemons(storeId, shoppingCartId, pokemonsInCart);

        return {
            shoppingCartId,
            storeId,
            pokemonsInCart
        }

    }

    private async _validateCardCredentials(cardOwner: string, cardNumber: string, cardCVV: string) {
        return true
    }

    private async _checkIfPokemonsInStoreAndReturnStoreId(shoppingCartId: string, pokemonsInCart: PokemonInCart[]): Promise<string> {
        const storeId = await this._shoppingCartRepo.getShoppingCartStoreId(shoppingCartId);
        const availablePokemons = await this._storeRepo.getStoreById(storeId);

        // necessarily true if no error have been thrown
        const enoughPokesInStore = pokemonsInCart.every((pokeInCart) => {
            const pokeInStore = availablePokemons.availablePokemons.find(p => p.id == pokeInCart.pokemon.id);
            if (!pokeInStore) {
                throw new Error(`Pokemon ${pokeInCart.pokemon.name} is not in store ${storeId}`);
            }
            if (pokeInStore.quantity < pokeInCart.quantity) {
                throw new Error(`Store ${storeId} has not enough ${pokeInCart.pokemon.name}  (${pokeInStore.quantity} < ${pokeInCart.quantity})`);
            }
            return true;
        });

        return storeId;

    }

    private async _updateStoreWithBoughtPokemons(storeId: string, shoppingCartId: string, pokemonsInCart: PokemonInCart[]) {
        const mappedPokemonsInCart = pokemonsInCart.map(pokeInCart => {
            return {
                id: pokeInCart.pokemon.id,
                quantity: pokeInCart.quantity
            }
        })
        await this._storeRepo.removePokemonsFromStore(storeId, mappedPokemonsInCart);
        
    }
}