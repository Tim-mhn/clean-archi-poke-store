import chai, { expect } from 'chai';
import { PokemonType } from '../../../src/domain/entities/pokemon.entity';
import Sinon, { fake } from "sinon";
import sinonChai from 'sinon-chai';
import { CalculateShoppingCartPriceUseCase } from '../../../src/domain/usecases/calculateShoppingCartPrice.useCase';
import { CalculatePokemonPriceInput, CalculatePokemonPriceUseCase } from '../../../src/domain/usecases/calculatePokemonPrice.useCase';
chai.use(sinonChai);

describe('Calculate ShoppingCart Price Use Case - constructor', () => {
    it('should throw error if calc poke price usecase is null', () => {
        const nullUsecase = null;
        const constructFn = () => new CalculateShoppingCartPriceUseCase(nullUsecase);

        expect(constructFn).to.throw();
    })

})

describe('Calculate ShoppingCart Price Use Case - getReductionCoeffIfBulkOrderOfOnePokemon', () => {

    let calculateShoppingCartPriceUsecase: CalculateShoppingCartPriceUseCase;
    let calcPokePriceUsecaseStub = Sinon.createStubInstance(CalculatePokemonPriceUseCase);
    beforeEach( ()=> {
        calculateShoppingCartPriceUsecase = new CalculateShoppingCartPriceUseCase(<CalculatePokemonPriceUseCase> <any> calcPokePriceUsecaseStub)
    });

    
    it('should throw error if at least one input is null', () => {
        const getReductionForBulkOrderShouldThrow = () => calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(1, null);
        const getReductionForBulkOrderShouldThrow2 = () => calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(null, 4);

        expect(getReductionForBulkOrderShouldThrow).to.throw();
        expect(getReductionForBulkOrderShouldThrow2).to.throw();

    })

    it('should return 0 if level is 1 and quantity is under 10', () => {
        const level = 1;
        const quantity = 9;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);
        
        expect(reduction).to.be.equal(0)

    })

    it('should return 0.1 if level is 1 and quantity is 10 or over', () => {
        const level = 1;
        const quantity = 10;
        const expectedReduction = 0.1;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);
        const reduction2 = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity + 1);

        expect(reduction).to.be.equal(expectedReduction)
        expect(reduction2).to.be.equal(expectedReduction)


    })

    it('should return 0 if level is 2 and quantity is under 8', () => {
        const level = 2;
        const quantity = 7;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);

        expect(reduction).to.be.equal(0)
    })

    it('should return 0.15 if level is 2 and quantity is 8 or over', () => {
        const level = 2;
        const quantity = 8;
        const expectedReduction = 0.15;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);
        const reduction2 = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity + 1);

        expect(reduction).to.be.equal(expectedReduction)
        expect(reduction2).to.be.equal(expectedReduction)

    })

    it('should return 0 if level is 3 and quantity is under 3', () => {
        const level = 3;
        const quantity = 2;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);

        expect(reduction).to.be.equal(0)
    })

    it('should return 0.2 if level is 3 and quantity is 3 or over', () => {
        const level = 3;
        const quantity = 3;
        const expectedReduction = 0.2;
        const reduction = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity);
        const reduction2 = calculateShoppingCartPriceUsecase.getReductionCoeffIfBulkOrderOfOnePokemon(level, quantity + 1);

        expect(reduction).to.be.equal(expectedReduction)
        expect(reduction2).to.be.equal(expectedReduction)

    })

})

describe('Calculate ShoppingCart Price Use Case - reducedPriceIfOrderIsExpensive', () => {

    let calculateShoppingCartPriceUsecase: CalculateShoppingCartPriceUseCase;
    let calcPokePriceUsecaseStub = Sinon.createStubInstance(CalculatePokemonPriceUseCase);
    beforeEach(() => {
        calculateShoppingCartPriceUsecase = new CalculateShoppingCartPriceUseCase(<CalculatePokemonPriceUseCase><any>calcPokePriceUsecaseStub)
    });


    it('should throw error if input is null', () => {
        const reducedPriceIfOrderIsExpensiveShouldThrow = () => calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive(null);

        expect(reducedPriceIfOrderIsExpensiveShouldThrow).to.throw();

    })

    it('should return same price if orderPrice is under 400', () => {
        const orderPrice = 350;
        const notReducedPrice = calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive(orderPrice);
        expect(notReducedPrice).to.be.equal(orderPrice);
    })

    it('should return a different price if orderPrice is 400 or over', () => {
        const orderPrice = 400;
        const reducedPrice = calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive(orderPrice);

        const orderPrice2 = 401;
        const reducedPrice2 = calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive(orderPrice2);
        expect(reducedPrice).not.to.be.equal(orderPrice);
        expect(reducedPrice2).not.to.be.equal(orderPrice2);

    })

    it('should return 80% of the price if orderPrice is 400 or over', () => {
        const orderPrice = 400;
        const reducedPrice = calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive(orderPrice);

        const expectedReducedPrice = 400 * 0.8;
        expect(reducedPrice).to.be.equal(expectedReducedPrice);

    })



})


describe('Calculate ShoppingCart Price Use Case - execute', () => {

    let calculateShoppingCartPriceUsecase: CalculateShoppingCartPriceUseCase;
    let calcPokePriceUsecaseStub = Sinon.createStubInstance(CalculatePokemonPriceUseCase);
    beforeEach(() => {
        calculateShoppingCartPriceUsecase = new CalculateShoppingCartPriceUseCase(<CalculatePokemonPriceUseCase><any>calcPokePriceUsecaseStub)
        const mapPokeInCartOutput: CalculatePokemonPriceInput = {
            level: 1,
            weight: 1,
            stats: 1,
            type: PokemonType.FIRE
        }
        // Sinon.stub(calculateShoppingCartPriceUsecase, "mapPokemonInCartToCalculatePokePriceInput").returns(mapPokeInCartOutput);
        // Sinon.stub(calculateShoppingCartPriceUsecase, "getReductionCoeffIfBulkOrderOfOnePokemon").returns(1);



    });


    it('should throw error if input is null', () => {
        const executeShouldThrow = () => calculateShoppingCartPriceUsecase.execute(null);
        expect(executeShouldThrow).to.throw();
    })

    it('should call computeOrderBasePrice and reducedPriceIfOrderIsExpensive once', () => {
        const pokemonsInCart: any[]= [null, null, null];
        Sinon.stub(calculateShoppingCartPriceUsecase, "computeOrderBasePrice").returns(1);
        Sinon.stub(calculateShoppingCartPriceUsecase, "reducedPriceIfOrderIsExpensive").returns(1);

        calculateShoppingCartPriceUsecase.execute(pokemonsInCart);

        Sinon.assert.calledOnce(<any>calculateShoppingCartPriceUsecase.computeOrderBasePrice)
        Sinon.assert.calledOnce(<any>calculateShoppingCartPriceUsecase.reducedPriceIfOrderIsExpensive)

    })

    



})