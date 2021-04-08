import { Service } from "typedi";
import { IStoreRepository } from "../../domain/repositories/store.repository";

const storesWithAvailablesPokemons: {
  storeId;
  availablePokemons: { name; quantity }[];
}[] = [
  {
    storeId: "1",
    availablePokemons: [
      {
        name: "charizard",
        quantity: 5,
      },
      {
        name: "Bulbasaur",
        quantity: 25,
      },
      {
        name: "Pikachu",
        quantity: 2,
      },
    ],
  },
  {
    storeId: "2",
    availablePokemons: [
      {
        name: "charizard",
        quantity: 5,
      },
      {
        name: "Bulbasaur",
        quantity: 25,
      },
      {
        name: "squirtle",
        quantity: 2,
      },
    ],
  },
  {
    storeId: "3",
    availablePokemons: [
      {
        name: "charizard",
        quantity: 5,
      },
      {
        name: "Bulbasaur",
        quantity: 25,
      },
      {
        name: "Pikachu",
        quantity: 2,
      },
    ],
  },
];

@Service()
export class DBStoreRepository implements IStoreRepository {
  constructor() {}

  async getAvailablePokemonsFromStore(storeId: string) {
    const storeWithPokemons = storesWithAvailablesPokemons.find(
      (store) => store.storeId === storeId
    );
    if (!storeWithPokemons) {
      throw new Error("store not found");
    }
    return storeWithPokemons.availablePokemons;
  }
}
