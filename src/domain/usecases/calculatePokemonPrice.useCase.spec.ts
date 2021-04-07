import chai, { expect } from 'chai';
import { PokemonType } from '../entities/pokemon.entity';
import { CalculatePokemonPriceInput, CalculatePokemonPriceUseCase } from './calculatePokemonPrice.useCase';

describe('Calculate Pokemon Price Use Case - Calculate poke price', () => {

    it ('output should have a price attribute', () => {
        const input = {
            level: 2,
            weight: 10,
            type: PokemonType.GRASS
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const output = usecase.execute(input);

        expect(output).to.have.property('price');
    })

    it ('price should be level * weight if pokemon is of type grass and there are no reductions', () => {
        const grassPokemonInput: CalculatePokemonPriceInput = {
            level: 2,
            weight: 10,
            type: PokemonType.GRASS
        }

        const calculateUsecase = new CalculatePokemonPriceUseCase();

        const ouput = calculateUsecase.execute(grassPokemonInput);
        const expectedPrice = 2*10;
        expect(ouput.price).to.equal(expectedPrice);
    })

    it('price should be level * weight * 2 if pokemon is of type water and there are no reductions', () => {
        const waterInput: CalculatePokemonPriceInput = {
            level: 4,
            weight: 5,
            type: PokemonType.WATER
        }

        const calculateUsecase = new CalculatePokemonPriceUseCase();

        const ouput = calculateUsecase.execute(waterInput);
        const expectedPrice = 4 * 5 * 2
        expect(ouput.price).to.equal(expectedPrice);
    });

    it('price should be level * weight * 4 if pokemon is of type fire and there are no reductions', () => {
        const fireinput: CalculatePokemonPriceInput = {
            level: 4,
            weight: 5,
            type: PokemonType.FIRE
        }

        const calculateUsecase = new CalculatePokemonPriceUseCase();

        const ouput = calculateUsecase.execute(fireinput);
        const expectedPrice = 4 * 5 * 4
        expect(ouput.price).to.equal(expectedPrice);
    })

    it('price should be level * weight * 3 if pokemon is of type electric and there are no reductions', () => {
        const electricinput: CalculatePokemonPriceInput = {
            level: 2,
            weight: 45,
            type: PokemonType.ELETRIC
        }

        const calculateUsecase = new CalculatePokemonPriceUseCase();

        const ouput = calculateUsecase.execute(electricinput);
        const expectedPrice = 2 * 45 * 3;
        expect(ouput.price).to.equal(expectedPrice);
    });

    it('should be a reduction if price is over 300', () => {
        const inputforPriceOver300: CalculatePokemonPriceInput = {
            level: 4,
            weight: 200,
            type: PokemonType.ELETRIC
        }

        const calculateUsecase = new CalculatePokemonPriceUseCase();

        const ouput = calculateUsecase.execute(inputforPriceOver300);
        const expectedPrice = 4 * 200 * 3 / 2;
        expect(ouput.price).to.equal(expectedPrice);
    })

})

describe('Calculate Pokemon price use case should throw error when input is incorrect', () => {
    it('should throw error if type is null', () => {
        const inputWithNullType = {
            level: 1,
            weight: 1,
            type: null
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const calculatePriceShouldThrowError = () => usecase.execute(inputWithNullType);

        expect(calculatePriceShouldThrowError).to.throw();


    });

    it('should throw error if level is negative', () => {
        const inputWithNullType = {
            level: -2,
            weight: 1,
            type: PokemonType.FIRE
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const calculatePriceShouldThrowError = () => usecase.execute(inputWithNullType);

        expect(calculatePriceShouldThrowError).to.throw();


    });

    it('should throw error if weight is negative', () => {
        const inputWithNullType = {
            level: 1,
            weight: -2,
            type: PokemonType.ELETRIC
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const calculatePriceShouldThrowError = () => usecase.execute(inputWithNullType);

        expect(calculatePriceShouldThrowError).to.throw();


    })

    it('should throw error if level is 0', () => {
        const inputWithNullType = {
            level: 0,
            weight: 1,
            type: PokemonType.FIRE
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const calculatePriceShouldThrowError = () => usecase.execute(inputWithNullType);

        expect(calculatePriceShouldThrowError).to.throw();


    });

    it('should throw error if weight is 0', () => {
        const inputWithNullType = {
            level: 1,
            weight: 0,
            type: PokemonType.ELETRIC
        };

        const usecase = new CalculatePokemonPriceUseCase();

        const calculatePriceShouldThrowError = () => usecase.execute(inputWithNullType);

        expect(calculatePriceShouldThrowError).to.throw();


    })
})
