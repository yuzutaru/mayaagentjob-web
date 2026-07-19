# Graph Report - mayaagentjob-web  (2026-07-12)

## Corpus Check
- 30 files · ~5,768 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 156 nodes · 197 edges · 14 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d7a3c74`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_UserRepositoryImpl.ts|UserRepositoryImpl.ts]]
- [[_COMMUNITY_User|User]]
- [[_COMMUNITY_UserRepository|UserRepository]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_useTheme.tsx|useTheme.tsx]]
- [[_COMMUNITY_Local Platform Blueprint React Web Portal (Maya)|Local Platform Blueprint: React Web Portal (Maya)]]
- [[_COMMUNITY_Maya Web Portal (React Admin Dashboard)|Maya Web Portal (React Admin Dashboard)]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_MayaAgentJob Web Portal AI Rules & Protocol|MayaAgentJob Web Portal AI Rules & Protocol]]
- [[_COMMUNITY_Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)|Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)]]
- [[_COMMUNITY_Gemini CLI & AI Rules (mayaagentjob-web)|Gemini CLI & AI Rules (mayaagentjob-web)]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `User` - 10 edges
3. `Local Platform Blueprint: React Web Portal (Maya)` - 7 edges
4. `UserRepository` - 6 edges
5. `compilerOptions` - 6 edges
6. `MayaAgentJob Web Portal AI Rules & Protocol` - 6 edges
7. `Maya Web Portal (React Admin Dashboard)` - 6 edges
8. `Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)` - 5 edges
9. `scripts` - 4 edges
10. `UserRepositoryImpl` - 4 edges

## Surprising Connections (you probably didn't know these)
- `UseUserProfileReturn` --references--> `User`  [EXTRACTED]
  src/presentation/hooks/useUserProfile.ts → src/domain/entities/User.ts
- `UserRepositoryImpl` --implements--> `UserRepository`  [EXTRACTED]
  src/data/repositories/UserRepositoryImpl.ts → src/domain/repositories/UserRepository.ts
- `JobCategoriesBarProps` --references--> `JobCategoryCardContract`  [EXTRACTED]
  src/presentation/components/home/JobCategoriesBar.tsx → src/domain/entities/HomePortalContract.ts
- `PopularVacanciesSectionProps` --references--> `PopularVacancyContract`  [EXTRACTED]
  src/presentation/components/home/PopularVacanciesSection.tsx → src/domain/entities/HomePortalContract.ts
- `HowWeWorkSectionProps` --references--> `HowWeWorkStepContract`  [EXTRACTED]
  src/presentation/components/home/HowWeWorkSection.tsx → src/domain/entities/HomePortalContract.ts

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "UserRepositoryImpl.ts"
Cohesion: 0.24
Nodes (8): mapUserDtoToDomain(), UserDto, UserRepositoryImpl, User, UserRepository, GetUserProfileUseCase, useUserProfile(), UseUserProfileReturn

### Community 1 - "User"
Cohesion: 0.12
Nodes (22): homePortalMockData, CtaBannerContract, FooterColumnContract, HomePortalContract, HowWeWorkStepContract, JobCategoryCardContract, PopularVacancyContract, QuickLinkItemContract (+14 more)

### Community 2 - "UserRepository"
Cohesion: 0.09
Nodes (21): dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, postcss, tailwindcss (+13 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+13 more)

### Community 4 - "useTheme.tsx"
Cohesion: 0.23
Nodes (8): App(), HomeNavbar(), ThemeContext, ThemeContextType, ThemeMode, ThemeProvider(), useTheme(), HomeLandingPage()

### Community 5 - "Local Platform Blueprint: React Web Portal (Maya)"
Cohesion: 0.18
Nodes (10): Core Architecture & Multi-Repo Ecosystem, 🎨 Design System: Web Desktop Blue & White, Global System Map: MayaAgentJob, Local Platform Blueprint: React Web Portal (Maya), Local Project Directory Architecture, 🔒 Session & Entitlement Handling, 📡 Shared TypeScript Contracts, Strict Local Rules for Code Generation (+2 more)

### Community 6 - "Maya Web Portal (React Admin Dashboard)"
Cohesion: 0.20
Nodes (9): 🏗️ Clean Architecture & Directory Structure, 🎨 Desktop Layout: Split-Pane Master-Detail Grid, Graphify Code Knowledge Graph, Maya Web Portal (React Admin Dashboard), 🏗️ Repository Role & Platform Context, 🔒 Session & Entitlement Handling, 🛠️ Technical Stack, The 2026 Testing Guarantee (100% Pure Domain) (+1 more)

### Community 7 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 8 - "MayaAgentJob Web Portal AI Rules & Protocol"
Cohesion: 0.29
Nodes (6): 1. Unified Multi-Repo Ecosystem & Architecture, 2. Mandatory Platform Context Loading, 3. Clean Architecture & The 2026 Testing Guarantee, 4. Platform-Specific Architectural Boundaries, 5. Autonomous Planning Protocol, MayaAgentJob Web Portal AI Rules & Protocol

### Community 9 - "Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)"
Cohesion: 0.33
Nodes (5): 🏗️ Architectural Boundaries & Synchronized Contracts, Claude Code AI Rules & Workspace Protocol (mayaagentjob-web), 🎨 Design System & Split-Pane Layout Rules, ⚡ Development & Build Commands, ⚡ Tooling: RTK & Graphify Usage

### Community 10 - "Gemini CLI & AI Rules (mayaagentjob-web)"
Cohesion: 0.40
Nodes (4): Gemini CLI & AI Rules (mayaagentjob-web), 📋 Mandatory Workflow: Platform Context Loading, 🔒 Strict Local Rules & Constraints, ⚡ Tooling: RTK & Graphify Usage

## Knowledge Gaps
- **73 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+68 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `name`, `private`, `version` to the rest of the system?**
  _73 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User` be split into smaller, more focused modules?**
  _Cohesion score 0.11612903225806452 - nodes in this community are weakly interconnected._
- **Should `UserRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._