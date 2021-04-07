import { Pokemon } from "../entities/pokemon.entity";

export abstract class AbstractPokemonRepository {
    abstract getPokemonDetailsByName(name: string): Promise<Pokemon>;
}