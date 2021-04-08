import { Service } from "typedi";
import { PokemonType } from "../../domain/entities/pokemon.entity";
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
};

@Service()
export class GetQuantityOfPokemonAvailableInStoreAndPricePresenter {
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
      availablePokemons,
    };
  }
}
