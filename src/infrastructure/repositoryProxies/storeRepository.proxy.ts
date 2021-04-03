import { Service } from "typedi";
import { DBStoreRepository } from "../db/store.repository";

@Service()
export class StoreRepositoryProxy {
    static getInstance() {
        return DBStoreRepository;
    }
}