import { AvailablePokemon } from "./available-pokemon.interface";

export interface Store {
    id: string;
    name: string;
    location: string;
}

export type StoreWithAvailablePokemons = Store & { availablePokemons: AvailablePokemon[]}