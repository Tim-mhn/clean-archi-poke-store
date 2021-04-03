import { Service } from "typedi";
import { Pokemon, PokemonType } from "../entities/pokemon.entity";
import { IPokemonRepository } from "../repositories/pokemon.repository";

export interface CalculatePokemonPriceInput {
    weight: number;
    type: PokemonType;
    level: number;
}

export interface CalculatePokemonPriceOutput {
    price: number;
}

@Service()
export class CalculatePokemonPriceUseCase {

    private readonly HALF_PRICE_THRESHOLD = 300;
    constructor() {
    }

    public async execute(input: CalculatePokemonPriceInput): Promise<CalculatePokemonPriceOutput> {
        let price: number;
        switch (input.type) {
            case PokemonType.ELETRIC:
                price = input.level * input.weight * 3;
                break;
            case PokemonType.FIRE:
                price = input.level * input.weight * 4;
                break;
            case PokemonType.WATER:
                price = input.level * input.weight * 2;
                break;
            case PokemonType.GRASS:
                price = input.level * input.weight * 1;
                break;
            default:
                throw new Error(`Can't calculate price for pokemon of type ${input.type}`);
        }

        if (price >= this.HALF_PRICE_THRESHOLD) {
            price = price/2;
        }

        return {
            price: price
        }
    }
}