export interface IProxyRepository<T> {
    getInstance: () => T;
}

// export abstract class AbstractRepositoryProxy<T> {
//     static getInstance: () => T;
// }