import { Service } from "typedi";
import { CreateEmptyShoppingCartOutput } from "../../domain/usecases/createEmptyShoppingCart.useCase";

type CreateEmptyShoppingCartPresenterOutput = { shoppingCartId: string };

@Service()
export class CreateEmptyShoppingCartPresenter {
    public present(useCaseOutput: CreateEmptyShoppingCartOutput): CreateEmptyShoppingCartPresenterOutput {
        return {
            shoppingCartId: useCaseOutput.shoppingCartId
        }
    }
}