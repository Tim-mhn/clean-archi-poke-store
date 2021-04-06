import { BodyParam, Get, JsonController, Param, Post, QueryParam, Res } from "routing-controllers";
import "reflect-metadata" // Don't forget to import this for each Controller
import bodyParser = require("body-parser");
import { Inject, Service } from "typedi";

@JsonController('/shopping-cart')
@Service()
export class ShoppingCartController {
    constructor(
    ) {
    }

    @Post()
    async createEmptyShoppingCart() {
        return "this is not an empty shopping cart"
    }
}

