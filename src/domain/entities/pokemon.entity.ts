export interface Pokemon {
    name: string;
    id: string;
    weight: number;
    type: PokemonType;
    level: number;
    stats: number;
    sprite: string;
}

export enum PokemonType {
    FIRE = "fire",
    WATER = "water",
    ELETRIC = "electric",
    GRASS = "grass"
}