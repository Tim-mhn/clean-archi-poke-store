import { Service } from "typedi";
import { PokemonType } from "../../domain/entities/pokemon.entity";
import { Store } from "../../domain/entities/store.entity";
import { StoreNotFoundError } from "../../domain/errors/store.errors";
import { GetQuantityOfPokemonAvailableInStoreAndPriceOutput } from "../../domain/usecases/getQuantityOfPokemonAvailableInStoreAndPrice.usecase";

type PokemonInfo = {
  id: string;
  name: string;
  type: PokemonType;
  weight: number;
};
type AvailablePokemon = {
  quantity: number;
  unitPrice: number;
  pokemon: PokemonInfo;
};
type GetQuantityOfPokemonAvailableInStoreAndPricePresenterOutput = {
  storeId: string;
  availablePokemons: AvailablePokemon[];
  name: string;
  location: string;
};

@Service()
export class GetQuantityOfPokemonAvailableInStoreAndPricePresenter {

  constructor() { };


  public present(
    useCaseOutput: GetQuantityOfPokemonAvailableInStoreAndPriceOutput
  ): GetQuantityOfPokemonAvailableInStoreAndPricePresenterOutput {

    const availablePokemons: AvailablePokemon[] = useCaseOutput.availablePokemonsWithPriceAndQuantity.map(
      (availablePoke) => {
        return {
          unitPrice: availablePoke.price,
          quantity: availablePoke.quantity,
          pokemon: {
            id: availablePoke.pokemon.id,
            name: availablePoke.pokemon.name,
            type: availablePoke.pokemon.type,
            weight: availablePoke.pokemon.weight,
          },
        };
      }
    );
    return {
      storeId: useCaseOutput.id,
      location: useCaseOutput.location,
      name: useCaseOutput.name,
      availablePokemons,
    };
  }
  
  public presentAllStores(stores: Store[]) {
    const storesWithStoreId = stores.map(store => {
        return {
          storeId: store.id,
          location: store.location,
          name: store.name
        }
    });

    return storesWithStoreId;
  }



  public presentOnError(error: Error) {
    let errorMessage;
    let statusCode;
    if (error instanceof StoreNotFoundError) {
      errorMessage = 'Store not found';
      statusCode = 403;
    } else {
      errorMessage = 'Internal error when getting pokemons from store'
      statusCode = 500;
    }

    return [statusCode, { message: errorMessage }];
  }
}
