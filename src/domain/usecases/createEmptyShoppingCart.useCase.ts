import { Service } from "typedi";
import { ShoppingCart } from "../entities/shoppingCart.entity";
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository";

export interface CreateEmptyShoppingCartInput {
    storeId: string;
}

export interface CreateEmptyShoppingCartOutput {
    shoppingCart: ShoppingCart;
}


@Service()
export class CreateEmptyShoppingCartUseCase {
    private shoppingCartRepo: AbstractShoppingCartRepository;
    
    constructor(shoppingCartRepo: AbstractShoppingCartRepository) {
        this.shoppingCartRepo = shoppingCartRepo;
    }

    public async execute(input: CreateEmptyShoppingCartInput): Promise<CreateEmptyShoppingCartOutput> {
    
        const shoppingCart = await this.shoppingCartRepo.createShoppingCart(input.storeId);

        return { shoppingCart: shoppingCart };
    }
}