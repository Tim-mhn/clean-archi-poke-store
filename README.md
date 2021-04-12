# CS - Clean Architecture Project
## Pokemons click'n'collect API

### Source Code

#### Business Objects & Logic : /domain folder
- Entities -> business objects
- Repository Abstract Classes -> adapter between entities and usecases
- UseCases : business logic

#### Implementation Logic : /infrastructure folder
- Controllers -> mapping of endpoints and use cases
- Presenters -> formatting of endpoint responses
- Mongo + Repositories -> implementation of repositories using MongoDB
- RepositoryProxies -> allows to inject concrete repositories into controllers
