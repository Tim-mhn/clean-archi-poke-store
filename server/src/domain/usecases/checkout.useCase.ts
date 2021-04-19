import { Service } from "typedi";
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
        const storeId = await this._checkIfPokemonsInStoreAndReturnStoreId(shoppingCartId);
        await this._validateCardCredentials(cardOwner, cardNumber, cardCVV);
        return await this._updateStoreWithBoughtPokemons(storeId, shoppingCartId);

    }

    private async _validateCardCredentials(cardOwner: string, cardNumber: string, cardCVV: string) {
        return true
    }

    private async _checkIfPokemonsInStoreAndReturnStoreId(shoppingCartId): Promise<string> {
        console.log(this._shoppingCartRepo);
        console.log(typeof this._shoppingCartRepo);
        const pokemonsInCart = await this._shoppingCartRepo.getShoppingCartDetails(shoppingCartId);
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

    private async _updateStoreWithBoughtPokemons(storeId: string, shoppingCartId: string) {
        const pokemonsInCart = await this._shoppingCartRepo.getShoppingCartDetails(shoppingCartId);
        const mappedPokemonsInCart = pokemonsInCart.map(pokeInCart => {
            return {
                id: pokeInCart.pokemon.id,
                quantity: pokeInCart.quantity
            }
        })
        await this._storeRepo.removePokemonsFromStore(storeId, mappedPokemonsInCart);
    }
}