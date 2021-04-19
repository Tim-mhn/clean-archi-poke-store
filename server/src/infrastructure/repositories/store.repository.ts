import { Service } from "typedi";
import { Store } from "../../domain/entities/store.entity";
import { StoreNotFoundError } from "../../domain/errors/store.errors";
import { AbstractStoreRepository } from "../../domain/repositories/store.repository";
import StoreModel from "../mongo/store.model";


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
      console.error('Error in getting available pokemons from store: ', e);
      throw new StoreNotFoundError()
    }
  }

  async getStoreById(storeId: string) {
    const storeInfo = await StoreModel.findById(storeId)
    storeInfo.id = storeInfo._id.toString();
    console.log(storeInfo)
    return storeInfo;
  }

  async getAllStores(): Promise<Store[]> {
    let stores = await StoreModel.find({});
    stores.forEach(st => this.mapMongoId(st));
    return stores;
  }

  async removePokemonsFromStore(storeId: string, pokemonsToRemove: { id: string; quantity: number }[]) {
    const availablePokemons = await this.getAvailablePokemonsFromStore(storeId);
    pokemonsToRemove.forEach(({ id, quantity }) => {
      let pokeToDecreaseQty = availablePokemons.find(p => p.id == id);
      if (pokeToDecreaseQty) pokeToDecreaseQty.quantity -= quantity
    });
    const updateRes = await StoreModel.updateOne({ _id: storeId }, { availablePokemons: availablePokemons});
    console.log('update: ', updateRes);
  }

  // async update() {
  //   let arr = new Array(45).fill(1);
  //   const availablePokemons = arr.map((_, idx) => {
  //     const qty = Math.round(100 * Math.random());
  //     const id = JSON.stringify(idx);
  //     return { quantity: qty, id: id};
  //   })
  //   return await StoreModel.updateOne({ _id: "607084ff417eb9766fa3baae" }, { availablePokemons: availablePokemons})
  // }
  private mapMongoId = (store) => store.id = store._id.toString();
  
}
