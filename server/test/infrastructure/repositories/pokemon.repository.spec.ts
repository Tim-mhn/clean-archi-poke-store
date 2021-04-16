import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { DBPokemonRepository } from '../../../src/infrastructure/repositories/pokemon.repository';
import { expect } from 'chai';
chai.use(chaiAsPromised);

describe('DB Pokemon Repository - Get Pokemon Details', () => {

    it('should return a pokemon with the right name', async () => {

        const pokemonRepo = new DBPokemonRepository();
        const existingPokemonId = '1';

        const charizard = await pokemonRepo.getPokemonDetailsById(existingPokemonId);
        
        expect(charizard.id).to.equal(existingPokemonId);

    })


    it ('Should throw error if no pokemon are found ', async () => {

        const pokemonRepo = new DBPokemonRepository();
        const pokemonNameThatDoesntExist = 'wwrongId';

        const getPokemonDetailsFnThatWillThrow = () => pokemonRepo.getPokemonDetailsById(pokemonNameThatDoesntExist);

        expect(getPokemonDetailsFnThatWillThrow()).to.eventually.throw();

    })

});