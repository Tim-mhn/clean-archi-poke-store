import { Pokemon } from "../entities/pokemon.entity";

export interface IPokemonRepository {
    getPokemonDetailsByName: (name: string) =>  Promise<Pokemon>;
}