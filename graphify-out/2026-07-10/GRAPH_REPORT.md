# Graph Report - .  (2026-07-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 19 nodes · 41 edges · 3 communities (2 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `820a5165`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_UserRepositoryImpl.ts|UserRepositoryImpl.ts]]
- [[_COMMUNITY_User|User]]
- [[_COMMUNITY_UserRepository|UserRepository]]

## God Nodes (most connected - your core abstractions)
1. `User` - 10 edges
2. `UserRepository` - 6 edges
3. `UserRepositoryImpl` - 4 edges
4. `GetUserProfileUseCase` - 4 edges
5. `mapUserDtoToDomain()` - 3 edges
6. `UserDto` - 2 edges
7. `UseUserProfileReturn` - 2 edges
8. `useUserProfile()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `UserRepositoryImpl` --implements--> `UserRepository`  [EXTRACTED]
  src/data/repositories/UserRepositoryImpl.ts → src/domain/repositories/UserRepository.ts
- `UseUserProfileReturn` --references--> `User`  [EXTRACTED]
  src/presentation/hooks/useUserProfile.ts → src/domain/entities/User.ts

## Import Cycles
- None detected.

## Communities (3 total, 1 thin omitted)

### Community 0 - "UserRepositoryImpl.ts"
Cohesion: 0.43
Nodes (3): mapUserDtoToDomain(), UserDto, UserRepositoryImpl

### Community 2 - "UserRepository"
Cohesion: 0.40
Nodes (3): UserRepository, GetUserProfileUseCase, useUserProfile()

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `User` connect `User` to `UserRepositoryImpl.ts`, `UserRepository`?**
  _High betweenness centrality (0.306) - this node is a cross-community bridge._
- **Why does `UserRepository` connect `UserRepository` to `UserRepositoryImpl.ts`, `User`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `UserRepositoryImpl` connect `UserRepositoryImpl.ts` to `UserRepository`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._