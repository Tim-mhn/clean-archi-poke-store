import { Service } from "typedi";
import { ShoppingCart } from "../../domain/entities/shoppingCart.entity";
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";

const carts: ShoppingCart[] = [

]

@Service()
export class DBShoppingCartRepository implements IShoppingCartRepository {
    constructor() { }

    async getShoppingCartDetails(id: string) {
        const shoppingCart = carts.find(cart => cart.id === id);

        if (!shoppingCart) {
            throw new Error(`shoppingCart ${id} not found`);
        }

        return shoppingCart.pokemons;
    }

    async createShoppingCart() {

        // TODO: create a shopping cart and add it to carts
        // get a new ID string generated randomly and use it as the cart ID
        // and create it with no pokemon inside
        
        //var newCart = ;
        //carts.push(newCart);

        // TODO: return true if there's no problem adding
        // return false if there's a problem on the insertion
        return true;
    }
}