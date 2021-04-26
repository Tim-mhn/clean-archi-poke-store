export interface Sorter {
    by: PokeSortField;
    asc: boolean;
}
export type PokeSortField = 'weight' | 'unitPrice';