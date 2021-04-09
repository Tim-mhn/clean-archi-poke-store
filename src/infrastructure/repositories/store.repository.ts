import { Service } from "typedi";
import { StoreNotFoundError } from "../../domain/errors/store.errors";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";
import Store from "../mongo/store.model";


@Service()
export class DBStoreRepository extends AbstractStoreRepository {
  constructor() {
    super();
  }


  async getAvailablePokemonsFromStore(storeId: string): Promise<{ id: string, quantity: number }[]> {
    try {
      const storeWithPokemons = <any>await this.getStoreById(storeId);
      return storeWithPokemons.availablePokemons;
    } catch (e) {
      console.error(e);
      throw new StoreNotFoundError()
    }
  }

  async getStoreById(storeId: string): Promise< {id, availablePokemons}> {
    const storeInfo = await Store.findById(storeId)
    storeInfo.id = storeInfo._id.toString();
    return storeInfo;
  }
}
