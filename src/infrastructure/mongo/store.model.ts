import { Document, Model, model, Types, Schema, Query } from "mongoose"
import "./index";

interface StoreDoc extends Document {
    id: string;
    availablePokemons: { id: string, quantity: number}[];
}

interface StoreModel extends Model<StoreDoc> {
    id: string;
    availablePokemons: { id: string, quantity: number }[];
}

export const Store = model('stores', new Schema<StoreDoc, StoreModel>({
    id: {
        type: String
    },
    availablePokemons: {
        type: Array
    }
})
)