import { Service } from "typedi";
import { DBPokemonRepository } from "../repositories/pokemon.repository";
@Service()
export class PokemonRepositoryProxy  {
    static getInstance() {
        return DBPokemonRepository;
    }
}