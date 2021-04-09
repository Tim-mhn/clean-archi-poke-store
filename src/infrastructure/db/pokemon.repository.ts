import { Service } from "typedi";
import { Pokemon, PokemonType } from "../../domain/entities/pokemon.entity";
import { AbstractPokemonRepository } from "../../domain/repositories/pokemon.repository";

const fetch = require("node-fetch");

@Service()
export class DBPokemonRepository extends AbstractPokemonRepository {
    constructor() { 
      super();
    }

    async getPokemonDetailsById(id: string) {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + id

        const getPokemon = await fetch(url);
        const pokemonData = await getPokemon.json();

        let stats: number = 0;
        for(let stat of pokemonData.stats){ //sum of base stats
            stats += stat.base_stat
        }

        const pokemon: Pokemon =
        {
            id: id,
            name: pokemonData.name,
            type: pokemonData.types[0].type.name,
            weight: pokemonData.weight,
            level: 1,
            stats: stats,
        };

        return pokemon;
    }
}
