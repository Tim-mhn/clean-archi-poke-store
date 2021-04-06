import { Service } from "typedi";
import { shoppingCart } from "../../domain/entities/shoppingCart.entity";
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";

const carts: shoppingCart[] = [

]

@Service()
export class DBShoppingCartRepository implements IShoppingCartRepository {
    constructor() { }

    async getShoppingCartDetails(id: string) {
        const shoppingCart = carts.find(cart => cart.id === id);

        if (!shoppingCart) {
            throw new Error(`shoppingCart ${id} not found`);
        }

        return shoppingCart.contains;
    }

}