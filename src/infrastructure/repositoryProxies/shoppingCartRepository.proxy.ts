import { Service } from "typedi";
import { DBShoppingCartRepository } from "../db/shoppingCart.repository";

@Service()
export class ShoppingCartRepositoryProxy  {
    static getInstance() {
        return DBShoppingCartRepository;
    }
}