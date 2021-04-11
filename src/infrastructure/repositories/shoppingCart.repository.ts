import { Service } from "typedi"
import { Pokemon } from "../../domain/entities/pokemon.entity"
import { ShoppingCart } from "../../domain/entities/shoppingCart.entity"
import { AbstractShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository"

const charSet =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const carts: ShoppingCart[] = []
var idHashTable = {}

function randomString(len) {
  
    while(true) { // dangerous, but in statistics we trust
        var randomString = ""
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length)
            randomString += charSet.substring(randomPoz, randomPoz + 1)
        }

        if(!(randomString in idHashTable)) {
            idHashTable[randomString] = true;
            return randomString
        }
    }
}

@Service()
export class DBShoppingCartRepository extends AbstractShoppingCartRepository {
    constructor() {
    super()
}

    async getShoppingCartDetails(id: string) {
        const shoppingCart = carts.find((cart) => cart.id === id)

        if (!shoppingCart) {
            throw new Error(`shoppingCart ${id} not found`)
        }

        return shoppingCart.pokemons
    }

    async createShoppingCart() {
        const id = randomString(8)
        const shoppingCart: ShoppingCart = { id: id, pokemons: [] }
        carts.push(shoppingCart)

        return id
    }

    async addPokemonToShoppingCart(shoppingCartId: string, pokemon: Pokemon) {
        const shoppingCart = carts.find((cart) => cart.id === shoppingCartId)

        if (!shoppingCart) {
            throw new Error(`shoppingCart ${shoppingCartId} not found`)
        }

        const pokemonInCart = shoppingCart.pokemons.find(
            (pokeInCart) => pokeInCart.pokemon.id === pokemon.id
        )
        if (!pokemonInCart) {
            shoppingCart.pokemons.push({ pokemon: pokemon, quantity: 1 })
        } else {
            pokemonInCart.quantity += 1
        }

        return shoppingCart.pokemons
    }

    async removePokemonFromShoppingCart(shoppingCartId: string, pokemon: Pokemon) {
        const shoppingCart = carts.find((cart) => cart.id === shoppingCartId)

        if (!shoppingCart) {
            throw new Error(`shoppingCart ${shoppingCartId} not found`)
        }

        const pokemonInCart = shoppingCart.pokemons.find(
            (pokeInCart) => pokeInCart.pokemon.id === pokemon.id
        )

        if (!pokemonInCart) {
            throw new Error(`tried to remove from ${shoppingCart} a pokemon that isn't there ${pokemon.id}`)
        } else {
            pokemonInCart.quantity -= 1
            /* Remove the pokemon from the shoppingCart 
            if the quantity is lesser or equal to zero.
            Equal should be enough, but who knows, right? */
            if(pokemonInCart.quantity <= 0) {
                const index = shoppingCart.pokemons.indexOf(pokemonInCart);
                if (index > -1) {
                    shoppingCart.pokemons.splice(index, 1);
                }
            }
        }

        return shoppingCart.pokemons
    }
}
