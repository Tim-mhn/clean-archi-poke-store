import chai, { expect } from 'chai';

import chaiAsPromised from 'chai-as-promised';
import { DBPokemonRepository } from './pokemon.repository';
chai.use(chaiAsPromised);

describe('DB Pokemon Repository - Get Pokemon Details', () => {

    it('should return a pokemon with the right name', async () => {

        const pokemonRepo = new DBPokemonRepository();
        const existingPokemonName = 'charizard';

        const charizard = await pokemonRepo.getPokemonDetailsByName(existingPokemonName);
        
        expect(charizard.name.toLowerCase()).to.equal(existingPokemonName.toLowerCase());

    })


    it ('Should throw error if no pokemon are found ', async () => {

        const pokemonRepo = new DBPokemonRepository();
        const pokemonNameThatDoesntExist = 'thisPokeDoesntExisteee';

        const getPokemonDetailsFnThatWillThrow = () => pokemonRepo.getPokemonDetailsByName(pokemonNameThatDoesntExist);

        expect(getPokemonDetailsFnThatWillThrow()).to.eventually.throw();

    })

    it('should be case insensitive with regards to the input', async () => {

        const pokemonRepo = new DBPokemonRepository();
        const lowercaseCharizard = 'charizard';
        const uppercaseCharizard = 'ChariZard';

        const charizard = await pokemonRepo.getPokemonDetailsByName(lowercaseCharizard);
        const charizardFromUpperCase = await pokemonRepo.getPokemonDetailsByName(uppercaseCharizard);
        expect(charizard).to.deep.equal(charizardFromUpperCase);

    })
});