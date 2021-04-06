import { Service } from "typedi";
import { IShoppingCartRepository } from "../repositories/shoppingCart.repository";

export interface CreateEmptyShoppingCartOutput {
    shoppingCartId: string;
}


@Service()
export class CreateEmptyShoppingCartUseCase {
    private shoppingCartRepo: IShoppingCartRepository;   
    
    constructor(shoppingCartRepo: IShoppingCartRepository) {
        this.shoppingCartRepo = shoppingCartRepo;
    }

    public async execute(): Promise<CreateEmptyShoppingCartOutput> {
    
        const shoppingCartId = await this.shoppingCartRepo.createShoppingCart();

        return { shoppingCartId: shoppingCartId };
    }
}