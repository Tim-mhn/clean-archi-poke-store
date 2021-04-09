import { Service } from "typedi";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";

const storesWithAvailablesPokemons: {
  storeId;
  availablePokemons: { id; name; quantity }[];
}[] = [
  {
    storeId: "1",
    availablePokemons: [
      {
        id: "1",
        name: "charizard",
        quantity: 5,
      },
      { id: "2", name: "Bulbasaur", quantity: 25 },
      { id: "3", name: "Pikachu", quantity: 2 },
    ],
  },
  {
    storeId: "2",
    availablePokemons: [
      {
        id: "1",
        name: "charizard",
        quantity: 5,
      },
      {
        id: "2",
        name: "Bulbasaur",
        quantity: 25,
      },
      {
        id: "3",
        name: "squirtle",
        quantity: 2,
      },
    ],
  },
  {
    storeId: "3",
    availablePokemons: [
      {
        id: "1",
        name: "charizard",
        quantity: 5,
      },
      {
        id: "2",
        name: "Bulbasaur",
        quantity: 25,
      },
      {
        id: "3",
        name: "Pikachu",
        quantity: 2,
      },
    ],
  },
];

@Service()
export class DBStoreRepository extends AbstractStoreRepository {
  constructor() {
    super();
  }

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
