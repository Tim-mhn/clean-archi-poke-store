import { Service } from "typedi";
import { DBStoreRepository } from "../repositories/store.repository";

@Service()
export class StoreRepositoryProxy {
    static getInstance() {
        return DBStoreRepository;
    }
}