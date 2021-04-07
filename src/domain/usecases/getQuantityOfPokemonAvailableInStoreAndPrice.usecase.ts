import { Service } from "typedi";
import { Pokemon } from "../entities/pokemon.entity";
import { AbstractPokemonRepository } from "../repositories/pokemon.repository";
import { AbstractStoreRepository } from "../repositories/store.repository";
import { CalculatePokemonPriceUseCase } from "./calculatePokemonPrice.useCase";

export interface GetQuantityOfPokemonAvailableInStoreAndPriceInput {
    storeId: string;
}

export interface GetQuantityOfPokemonAvailableInStoreAndPriceOutput {
    availablePokemonsWithPriceAndQuantity: { pokemon: Pokemon, price: number, quantity: number}[];
    id: string;
}

@Service()
export class GetQuantityOfPokemonAvailableInStoreAndPriceUseCase {

    private pokemonRepo: AbstractPokemonRepository;
    private storeRepo: AbstractStoreRepository;
    private calculatePokemonPriceUseCase: CalculatePokemonPriceUseCase;

    constructor(pokemonRepo: AbstractPokemonRepository, storeRepo: AbstractStoreRepository, calculatePokemonPriceUseCase: CalculatePokemonPriceUseCase) {
        this.pokemonRepo = pokemonRepo;
        this.storeRepo = storeRepo;
        this.calculatePokemonPriceUseCase = calculatePokemonPriceUseCase;
    }

    public async execute(input: GetQuantityOfPokemonAvailableInStoreAndPriceInput): Promise<GetQuantityOfPokemonAvailableInStoreAndPriceOutput> {
        const availablePokemonNamesAndQuantity = await this.storeRepo.getAvailablePokemonsFromStore(input.storeId);

        const availablePokemonsWithPriceAndQuantityPromises = availablePokemonNamesAndQuantity.map(async ({name, quantity}) => {
            const poke: Pokemon = await this.pokemonRepo.getPokemonDetailsByName(name);
            const { price } = this.calculatePokemonPriceUseCase.execute(poke);
            return {
                pokemon: poke,
                price,
                quantity
            }

        });

        const availablePokemonsWithPriceAndQuantity = await Promise.all(availablePokemonsWithPriceAndQuantityPromises);
        
        return {
            availablePokemonsWithPriceAndQuantity,
            id: input.storeId
        }
    }
}