import { Service } from 'typedi'

@Service()
export abstract class AbstractStoreRepository {
    abstract getAvailablePokemonsFromStore(
        storeId: string
    ): Promise<{ quantity: number; id: string }[]>

    abstract getStoreById(storeId: string): Promise<{ id; availablePokemons }>
}
