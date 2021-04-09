import { Service } from "typedi"
import { Pokemon } from "../../domain/entities/pokemon.entity"
import { ShoppingCart } from "../../domain/entities/shoppingCart.entity"
import { IShoppingCartRepository } from "../../domain/repositories/shoppingCart.repository"

const carts: ShoppingCart[] = []

function randomString(len) {
    const charSet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var randomString = ""
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
}

@Service()
export class DBShoppingCartRepository implements IShoppingCartRepository {
    constructor() {}

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
}
