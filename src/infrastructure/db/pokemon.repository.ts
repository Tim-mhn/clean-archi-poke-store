import { Service } from "typedi";
import { Pokemon, PokemonType } from "../../domain/entities/pokemon.entity";
import { AbstractPokemonRepository } from "../../domain/repositories/pokemon.repository";

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
export class DBPokemonRepository extends AbstractPokemonRepository {
  constructor() {
    super()
  }

  async getPokemonDetailsById(id: string) {
    const pokemon = pokemons.find(poke => poke.id === id);
    if (!pokemon) {
      console.error('error')
      throw new Error(`pokemon ${id} not found`);
    }
    return pokemon;
  }
}
