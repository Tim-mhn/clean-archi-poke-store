import { modelNames } from "mongoose";
import { Service } from "typedi";
import { Pokemon } from "../entities/pokemon.entity";
import { PokemonInCart } from "../entities/shoppingCart.entity";
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository";
import { CalculatePokemonPriceUseCase } from "./calculatePokemonPrice.useCase";
import { CalculateShoppingCartPriceUseCase } from "./calculateShoppingCartPrice.useCase";
import { EstimateReadyForPickupDateUseCase } from "./estimateReadyForPickupDate.usecase";

export interface GetShoppingCartContentPriceAndReadyDateInput {
    shoppingCartId: string;
    now: Date;
}

export interface GetShoppingCartContentPriceAndReadyDateOutput {
    pokemons: { pokemon: { name: string, id: string }, price: number, quantity: number }[];
    shoppingCartId: string;
    price: number;
    readyDate: Date;

}

@Service()
export class GetShoppingCartContentPriceAndReadyDateUseCase {

    shoppingCartRepo: AbstractShoppingCartRepository;
    estimateReadyForPickupDateUseCase: EstimateReadyForPickupDateUseCase = new EstimateReadyForPickupDateUseCase();
    calculatePokePriceUsecase: CalculatePokemonPriceUseCase = new CalculatePokemonPriceUseCase();
    calculateShoppingCartPriceUsecase: CalculateShoppingCartPriceUseCase = new CalculateShoppingCartPriceUseCase(this.calculatePokePriceUsecase);

    constructor(shoppingCartRepo: AbstractShoppingCartRepository,
    ) {
        if (!shoppingCartRepo) {
            throw new Error('Error GetShoppingCartDetailsUseCase constructor. One arg is null');
        }
        this.shoppingCartRepo = shoppingCartRepo;


    }

    public async execute(input: GetShoppingCartContentPriceAndReadyDateInput): Promise<GetShoppingCartContentPriceAndReadyDateOutput> {
        const pokemonsInCart = await this.shoppingCartRepo.getShoppingCartDetails(input.shoppingCartId);
        const pokemonsWithUnitPriceAndQuantity = this.pokemonsWithUnitPriceAndQuantityInfo(pokemonsInCart)
        const shoppingCartPrice = this.calculateShoppingCartPriceUsecase.execute(pokemonsInCart);
        const estimatedPickupDate = this.estimateReadyForPickupDateUseCase.execute({now: input.now, pokemonsInCart: pokemonsInCart});
            return {
                shoppingCartId: input.shoppingCartId,
                price: shoppingCartPrice,
                readyDate: estimatedPickupDate,
                pokemons: pokemonsWithUnitPriceAndQuantity
            }
    }

    pokemonsWithUnitPriceAndQuantityInfo(pokemonsInCart: PokemonInCart[]): {pokemon: {name, id}, price: number, quantity: number}[] {
        return pokemonsInCart.map(poke => {
            const { price } = this.calculatePokePriceUsecase.execute(poke.pokemon);
            return {
                pokemon: {
                    name: poke.pokemon.name,
                    id: poke.pokemon.id,
                },
                price: price,
                quantity: poke.quantity
            }
        });

    }

}