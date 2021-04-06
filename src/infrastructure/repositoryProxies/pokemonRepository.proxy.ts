import { Service } from "typedi";
import { IPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { DBPokemonRepository } from "../db/pokemon.repository";

@Service()
export class PokemonRepositoryProxy  {
    static getInstance() {
        return DBPokemonRepository;
    }
}