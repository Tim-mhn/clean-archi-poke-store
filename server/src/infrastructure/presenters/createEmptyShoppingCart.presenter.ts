import { Service } from "typedi";
import { ShoppingCart } from "../../domain/entities/shoppingCart.entity";
import { CreateEmptyShoppingCartOutput } from "../../domain/usecases/createEmptyShoppingCart.useCase";

type CreateEmptyShoppingCartPresenterOutput = { shoppingCart: ShoppingCart };

@Service()
export class CreateEmptyShoppingCartPresenter {
    public present(useCaseOutput: CreateEmptyShoppingCartOutput): CreateEmptyShoppingCartPresenterOutput {
        return {
            shoppingCart: useCaseOutput.shoppingCart
        }
    }
}