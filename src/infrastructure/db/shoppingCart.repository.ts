import { Service } from "typedi";
import { ShoppingCart } from "../../domain/entities/shoppingCart.entity";
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository";

const carts: ShoppingCart[] = [

]

function randomString(len) {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


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
        
        const shoppingCart: ShoppingCart = { id: randomString(8), pokemons: [] };
        carts.push(shoppingCart);

        // TODO: return false if it failed to insert for some reason
        return true;
    }
}