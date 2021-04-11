import { Service } from "typedi";
import { AbstractShoppingCartRepository } from "../repositories/shoppingCart.repository";

export interface CreateEmptyShoppingCartOutput {
    shoppingCartId: string;
}


@Service()
export class CreateEmptyShoppingCartUseCase {
    private shoppingCartRepo: AbstractShoppingCartRepository;
    
    constructor(shoppingCartRepo: AbstractShoppingCartRepository) {
        this.shoppingCartRepo = shoppingCartRepo;
    }

    public async execute(): Promise<CreateEmptyShoppingCartOutput> {
    
        const shoppingCartId = await this.shoppingCartRepo.createShoppingCart();

        return { shoppingCartId: shoppingCartId };
    }
}