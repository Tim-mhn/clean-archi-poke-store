import { Service } from 'typedi'
import { ShoppingCart } from '../entities/shoppingCart.entity'
import { AbstractShoppingCartRepository } from '../repositories/shoppingCart.repository'
import { AbstractStoreRepository } from '../repositories/store.repository'

export interface CreateEmptyShoppingCartInput {
    storeId: string
}

export interface CreateEmptyShoppingCartOutput {
    shoppingCart: ShoppingCart
}

@Service()
export class CreateEmptyShoppingCartUseCase {
    private shoppingCartRepo: AbstractShoppingCartRepository
    private storeRepository: AbstractStoreRepository

    constructor(
        shoppingCartRepo: AbstractShoppingCartRepository,
        storeRepo: AbstractStoreRepository
    ) {
        if (!shoppingCartRepo || !storeRepo) {
            throw new Error('Error createEmptyShoppingCart usecase constructor. One arg is null');
        }

        this.shoppingCartRepo = shoppingCartRepo
        this.storeRepository = storeRepo
    }

    public async execute(
        input: CreateEmptyShoppingCartInput
    ): Promise<CreateEmptyShoppingCartOutput> {
        const store = await this.storeRepository.getStoreById(input.storeId)
        const shoppingCart = await this.shoppingCartRepo.createEmptyShoppingCart(
            store
        )

        return { shoppingCart: shoppingCart }
    }
}
