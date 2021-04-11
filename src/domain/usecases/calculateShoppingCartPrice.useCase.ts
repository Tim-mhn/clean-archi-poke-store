import { Service } from "typedi";
import { PokemonInCart } from "../entities/shoppingCart.entity";
import { CalculatePokemonPriceInput, CalculatePokemonPriceUseCase } from "./calculatePokemonPrice.useCase";


@Service()
export class CalculateShoppingCartPriceUseCase {
    constructor(public calculatePokemonPriceUsecase: CalculatePokemonPriceUseCase) {
        if (!calculatePokemonPriceUsecase) throw new Error('Error in calculate sc usecase constructor. Calculate poke price usecas is null')
        this.calculatePokemonPriceUsecase = calculatePokemonPriceUsecase;
    }

    public execute(pokemonsInCart: PokemonInCart[]): number {
        console.log(pokemonsInCart);
        let price = this.computeOrderBasePrice(pokemonsInCart);
        console.log(price);
        price = this.reducedPriceIfOrderIsExpensive(price);

        return price;


    }

    computeOrderBasePrice(pokemonsInCart: PokemonInCart[]) {
        let price = 0;
        pokemonsInCart.forEach(pokeInCart => {
            const calculatePokePriceInput: CalculatePokemonPriceInput = this.mapPokemonInCartToCalculatePokePriceInput(pokeInCart);

            const pokeUnitPrice = this.calculatePokemonPriceUsecase.execute(calculatePokePriceInput);
            console.log(pokeUnitPrice);
            const reductionCoeffIfBulkOrder = this.getReductionCoeffIfBulkOrderOfOnePokemon(pokeInCart.pokemon.level, pokeInCart.quantity);
            price += pokeUnitPrice.price * pokeInCart.quantity * reductionCoeffIfBulkOrder;
        });
        return price;
    }

    mapPokemonInCartToCalculatePokePriceInput(pokeInCart: PokemonInCart) {
        return {
            level: pokeInCart.pokemon.level,
            stats: pokeInCart.pokemon.stats,
            type: pokeInCart.pokemon.type,
            weight: pokeInCart.pokemon.weight
        }
    }
    getReductionCoeffIfBulkOrderOfOnePokemon(level: number, quantity: number): number {
        if (!level || !quantity) {
            throw new Error('getReductionCoeffIfBulkOrderOfOnePokemon: some inputs are null')
        }
        let reduction = 0;

        if (level == 1 && quantity >= 10) {
            reduction = 0.1; // 10% reduction
        }

        if (level == 2 && quantity >= 8) {
            reduction = 0.15;
        }

        if (level >= 3 && quantity >= 3) {
            reduction = 0.2
        };

        return 1-reduction;

    }


    reducedPriceIfOrderIsExpensive(orderPrice: number): number {
        if (!orderPrice) throw new Error('cant calculate reduced price if order is exp because input is null');
        const REDUCTION_THRESHOLD = 400;
        const REDUCTION_COEFF = .8; // 20%reduction if price is over 400
        return orderPrice >= REDUCTION_THRESHOLD ? orderPrice * REDUCTION_COEFF : orderPrice;
    }
}