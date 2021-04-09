import { Service } from "typedi";
import { StoreNotFound } from "../../domain/errors/store.errors";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";
import { Store } from "../mongo/store.model";


@Service()
export class DBStoreRepository extends AbstractStoreRepository {
  constructor() {
    super();
  }


  async getAvailablePokemonsFromStore(storeId: string): Promise<{ id: string, quantity: number }[]> {
    try {
      const storeWithPokemons = await this.getStoreById(storeId);
      return storeWithPokemons.availablePokemons;
    } catch (e) {
      console.error(e);
      throw new StoreNotFound()
    }
  }

  async getStoreById(storeId: string) {
    return await Store.findById(storeId)
  }
}
