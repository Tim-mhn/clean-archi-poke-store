import { Service } from "typedi";
import { Pokemon } from "../entities/pokemon.entity";
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository";

export interface GetShoppingCartContentPriceAndReadyDateInput {
    storeId: string;
    now: Date;
}

export interface GetShoppingCartContentPriceAndReadyDateOutput {
    pokemons: { pokemon: { name: string, id: string}, price: number, quantity: number }[];
    storeId: string;
    price: number;
    readyDate: Date;

}

@Service()
export class GetShoppingCartContentPriceAndReadyDateUseCase {

    shoppingCartRepo: AbstractShoppingCartRepository;
    constructor(shoppingCartRepo: AbstractShoppingCartRepository) {
        if (!shoppingCartRepo) {
            throw new Error('Error GetShoppingCartDetailsUseCase constructor. One arg is null');
        }
        this.shoppingCartRepo = shoppingCartRepo;
    }

    // public async execute(input: GetShoppingCartContentPriceAndReadyDateInput): Promise<GetShoppingCartContentPriceAndReadyDateOutput> {
    //     const pokemonsInCart = await this.shoppingCartRepo.getShoppingCartDetails(input.storeId);
        
    // }

}