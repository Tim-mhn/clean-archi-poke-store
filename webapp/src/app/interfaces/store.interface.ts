import { AvailablePokemon } from "./available-pokemon.interface";

export interface Store {
    storeId: string;
    name: string;
    location: string;
}

export type StoreWithAvailablePokemons = Store & { availablePokemons: AvailablePokemon[]}