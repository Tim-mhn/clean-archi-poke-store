import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Sinon from 'sinon';
import { StoreNotFoundError } from '../../../src/domain/errors/store.errors';
import { DBStoreRepository } from '../../../src/infrastructure/repositories/store.repository';
chai.use(chaiAsPromised);

describe('Store Mongo Repository - getAvailablePokemonsFromStore', () => {

    it('should throw Store Not Found Error if given inexistent store id', async () => {

        const mongoStoreRepo = new DBStoreRepository();
        const inexistentStoreId = "thisIdWontWork";

        const getPokemonsFromStoreShouldThrow = async () => await mongoStoreRepo.getAvailablePokemonsFromStore(inexistentStoreId);

        await expect(getPokemonsFromStoreShouldThrow()).to.be.rejectedWith(StoreNotFoundError);
    })

    it('should return .availablePokemons from getStoreById output', async () => {

        const mongoStoreRepo = new DBStoreRepository();
        const randomId = "id";
        const randomGetStoreOuput = [null, null, null]; // random array
        Sinon.stub(mongoStoreRepo, "getStoreById").returns(Promise.resolve({ availablePokemons: randomGetStoreOuput, id: randomId}));

        const availablePokesFromStore = await mongoStoreRepo.getAvailablePokemonsFromStore(randomId);

        expect(availablePokesFromStore).to.be.equal(randomGetStoreOuput);
    })


});

describe('Store Mongo Repository - getStoreById', () => {
    it('Should return store object with id and list of availablePokemons', async () => {
        const mongoStoreRepo = new DBStoreRepository();
        const existingStoreId = '607084ff417eb9766fa3baae';

        const storeInfo = await mongoStoreRepo.getStoreById(existingStoreId);
        expect(storeInfo).to.have.property('availablePokemons');
        expect(storeInfo).to.have.property('id');
        expect(storeInfo.id).to.be.deep.equal(existingStoreId);
    })
})