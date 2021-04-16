import { Service } from 'typedi'
import { Store } from '../entities/store.entity';

@Service()
export abstract class AbstractStoreRepository {
    abstract getAvailablePokemonsFromStore(
        storeId: string
    ): Promise<{ quantity: number; id: string }[]>

    abstract getStoreById(storeId: string): Promise<{ id; availablePokemons, location, name }>;

    abstract getAllStores(): Promise<Store[]>;
}
