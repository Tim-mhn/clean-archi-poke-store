import { Service } from "typedi";
import { PokemonType } from "../entities/pokemon.entity";

export interface CalculatePokemonPriceInput {
    weight: number;
    type: PokemonType;
    level: number;
    stats: number;
}

export interface CalculatePokemonPriceOutput {
    price: number;
}

@Service()
export class CalculatePokemonPriceUseCase {

    public readonly HALF_PRICE_THRESHOLD;
    constructor() {
        this.HALF_PRICE_THRESHOLD = 300;
    }

    public execute(input: CalculatePokemonPriceInput): CalculatePokemonPriceOutput {
        let type_coeff: number;

        if (input.level <= 0) {
            throw new Error('Level cannot be negative');
        }

        if (input.weight <= 0) {
            throw new Error('Level cannot be negative');
        }
        switch (input.type) {
            case PokemonType.ELETRIC:
                type_coeff = 5;
                break;
            case PokemonType.FIRE:
                type_coeff = 2;
                break;
            case PokemonType.WATER:
                type_coeff = 1.5;
                break;
            case PokemonType.GRASS:
                type_coeff = 1;
                break;
            default:
                throw new Error(`Can't calculate price for pokemon of type ${input.type}`);
        }

        let price: number = input.level * input.weight * type_coeff + input.stats
        if (price >= this.HALF_PRICE_THRESHOLD) {
            price = price/2;
        }

        return {
            price: price
        }
    }
}