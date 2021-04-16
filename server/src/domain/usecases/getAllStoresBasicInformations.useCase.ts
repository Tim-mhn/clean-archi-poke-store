import { Service } from "typedi";
import { AbstractStoreRepository } from "../repositories/store.repository";

@Service()
export class GetAllStoresBasicInformationsUseCase {
    constructor(private storeRepo : AbstractStoreRepository) {
    }

    public async execute () {
        return await this.storeRepo.getAllStores();
    }
}