import { Service } from "typedi";
import { Pokemon } from "../entities/pokemon.entity";

@Service()
export abstract class AbstractPokemonRepository {
    abstract getPokemonDetailsById(id: string): Promise<Pokemon>;
}