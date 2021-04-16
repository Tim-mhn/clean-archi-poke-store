import { Service } from "typedi";
import { Pokemon } from "../entities/pokemon.entity";
import { AbstractPokemonRepository } from "../repositories/pokemon.repository";
import { AbstractStoreRepository } from "../repositories/store.repository";
import { CalculatePokemonPriceUseCase } from "./calculatePokemonPrice.useCase";

export interface GetQuantityOfPokemonAvailableInStoreAndPriceInput {
    storeId: string;
}

export interface GetQuantityOfPokemonAvailableInStoreAndPriceOutput {
    availablePokemonsWithPriceAndQuantity: { pokemon: Pokemon, price: number, quantity: number }[];
    id: string;
    name: string;
    location: string;
}

@Service()
export class GetQuantityOfPokemonAvailableInStoreAndPriceUseCase {

    private pokemonRepo: AbstractPokemonRepository;
    private storeRepo: AbstractStoreRepository;
    private calculatePokemonPriceUseCase: CalculatePokemonPriceUseCase;

    constructor(pokemonRepo: AbstractPokemonRepository, storeRepo: AbstractStoreRepository, calculatePokemonPriceUseCase: CalculatePokemonPriceUseCase) {
        if (!pokemonRepo || !storeRepo || !calculatePokemonPriceUseCase) {
            throw new Error('Error getQtyOfPokeAvailableInStoreAndPrice usecase constructor. One arg is null');
        }
        this.pokemonRepo = pokemonRepo;
        this.storeRepo = storeRepo;
        this.calculatePokemonPriceUseCase = calculatePokemonPriceUseCase;
    }

    public async execute(input: GetQuantityOfPokemonAvailableInStoreAndPriceInput): Promise<GetQuantityOfPokemonAvailableInStoreAndPriceOutput> {
        const storeInfo = await this.storeRepo.getStoreById(input.storeId);
        const availablePokemonNamesAndQuantity = await this.storeRepo.getAvailablePokemonsFromStore(input.storeId);
        const availablePokemonsWithPriceAndQuantity = await this.getAvailablePokemonsWithPriceAndQty(availablePokemonNamesAndQuantity)

        return {
            availablePokemonsWithPriceAndQuantity,
            id: input.storeId,
            name: storeInfo.name,
            location: storeInfo.location,
        }
    }

    private getAvailablePokemonsWithPriceAndQty = async (availablePokemonNamesAndQuantity: {quantity, id}[]): Promise<{ pokemon: Pokemon, price: number, quantity: number }[]> => {
        const availablePokemonsWithPriceAndQuantityPromises = availablePokemonNamesAndQuantity.map(async ({ id, quantity }) => {
            const poke: Pokemon = await this.pokemonRepo.getPokemonDetailsById(id);
            const { price } = await this.calculatePokemonPriceUseCase.execute(poke);
            return {
                pokemon: poke,
                price,
                quantity
            }

        });

        const availablePokemonsWithPriceAndQuantity = await Promise.all(availablePokemonsWithPriceAndQuantityPromises);
        return availablePokemonsWithPriceAndQuantity;
    }
}