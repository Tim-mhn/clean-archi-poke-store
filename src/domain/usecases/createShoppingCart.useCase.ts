import { Service } from "typedi";

@Service()
export class CreateShoppingCartUseCase {

    constructor() {
    }

    public async execute(): Promise<boolean> {
    

        return true;
    }
}