import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { SinonFakeXMLHttpRequest } from "sinon";
import "./index";

interface StoreDoc extends Document {
    id: string;
    availablePokemons: { id: string, quantity: number }[];
}

interface StoreModel extends Model<StoreDoc> {
    id: string;
    availablePokemons: { id: string, quantity: number }[];
}

let Store;

// Check if a 'stores' model has already been defined
try {
    Store = model('stores');
}
// Otherwise create new one
catch (e) {
    Store = model('stores', new Schema<StoreDoc, StoreModel>({
        id: {
            type: String
        },
        availablePokemons: {
            type: Array
        }
    })
    )
}

export default Store;