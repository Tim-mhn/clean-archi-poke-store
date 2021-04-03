import { Pokemon } from "../entities/pokemon.entity";

export interface IPokemonRepository {
    getPokemonDetails: (name: string) =>  Promise<Pokemon>;
}