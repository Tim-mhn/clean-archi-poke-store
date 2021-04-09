import { Service } from "typedi";
import { Pokemon, PokemonType } from "../../domain/entities/pokemon.entity";
import { IPokemonRepository } from "../../domain/repositories/pokemon.repository";
import { PokemonRepositoryProxy } from "../repositoryProxies/pokemonRepository.proxy";

const fetch = require("node-fetch");

const pokemons: Pokemon[] = [
  {
    id: "1",
    name: "charizard",
    type: PokemonType.FIRE,
    weight: 100,
    level: 3,
  },
  {
    id: "2",
    name: "Bulbasaur",
    type: PokemonType.GRASS,
    weight: 30,
    level: 1,
  },
  {
    id: "3",
    name: "Pikachu",
    type: PokemonType.ELETRIC,
    weight: 10,
    level: 1,
  },
  {
    id: "4",
    name: "squirtle",
    type: PokemonType.WATER,
    weight: 20,
    level: 2,
  },
];



@Service()
export class DBPokemonRepository implements IPokemonRepository {
  constructor() {}

  async getPokemonDetails(id: string) {
    console.log('https://pokeapi.co/api/v2/pokemon/' + id);
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const pokemonData = await pokemon.json();
    console.log(pokemonData);

    // const pokemon = pokemons.find((poke) => poke.id === id);
    if (!pokemon) {
      throw new Error(`pokemon ${id} not found`);
    }
    return pokemon;
  }
}
