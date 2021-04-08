import { Pokemon } from "../entities/pokemon.entity";

export interface IPokemonRepository {
    getPokemonDetails: (id: string) =>  Promise<Pokemon>;
}