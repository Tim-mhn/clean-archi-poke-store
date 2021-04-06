export interface IStoreRepository {
    getAvailablePokemonsFromStore: (storeId: string) => Promise<{quantity: number, name: string}[]>;

}