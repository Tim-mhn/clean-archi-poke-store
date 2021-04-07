export abstract class AbstractStoreRepository {
    abstract getAvailablePokemonsFromStore (storeId: string): Promise<{quantity: number, name: string}[]>;

}