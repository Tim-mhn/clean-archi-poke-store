import { Service } from "typedi";
import { DBPokemonRepository } from "../db/pokemon.repository";

@Service()
export class PokemonRepositoryProxy  {
    static getInstance() {
        return DBPokemonRepository;
    }
}