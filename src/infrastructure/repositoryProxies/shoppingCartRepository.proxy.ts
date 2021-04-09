import { Service } from "typedi";
import { DBShoppingCartRepository } from "../repositories/shoppingCart.repository";

@Service()
export class ShoppingCartRepositoryProxy  {
    static getInstance() {
        return DBShoppingCartRepository;
    }
}