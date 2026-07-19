# Graph Report - mayaagentjob-web  (2026-07-20)

## Corpus Check
- 50 files · ~11,588 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 230 nodes · 363 edges · 18 communities (16 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `406ac4e9`
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
- [[_COMMUNITY_tailwind.config.js|tailwind.config.js]]
- [[_COMMUNITY_UserLocation|UserLocation]]
- [[_COMMUNITY_TranslationContext.tsx|TranslationContext.tsx]]
- [[_COMMUNITY_CandidateOnboardingModal.tsx|CandidateOnboardingModal.tsx]]
- [[_COMMUNITY_setup.ts|setup.ts]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 18 edges
2. `useTranslation()` - 17 edges
3. `UserLocation` - 12 edges
4. `User` - 10 edges
5. `IUserLocationRepository` - 9 edges
6. `ParsedResumeProfile` - 8 edges
7. `Local Platform Blueprint: React Web Portal (Maya)` - 7 edges
8. `scripts` - 6 edges
9. `ICandidateOnboardingRepository` - 6 edges
10. `UserRepository` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CandidateOnboardingModal()` --calls--> `useTranslation()`  [EXTRACTED]
  src/presentation/components/auth/CandidateOnboardingModal.tsx → src/core/i18n/TranslationContext.tsx
- `HeroSearchSection()` --calls--> `useTranslation()`  [EXTRACTED]
  src/presentation/components/home/HeroSearchSection.tsx → src/core/i18n/TranslationContext.tsx
- `HomeNavbar()` --calls--> `useTranslation()`  [EXTRACTED]
  src/presentation/components/home/HomeNavbar.tsx → src/core/i18n/TranslationContext.tsx
- `CandidateOnboardingModalProps` --references--> `ParsedResumeProfile`  [EXTRACTED]
  src/presentation/components/auth/CandidateOnboardingModal.tsx → src/domain/entities/CandidateOnboardingContract.ts
- `UseUserProfileReturn` --references--> `User`  [EXTRACTED]
  src/presentation/hooks/useUserProfile.ts → src/domain/entities/User.ts

## Import Cycles
- None detected.

## Communities (18 total, 2 thin omitted)

### Community 0 - "UserRepositoryImpl.ts"
Cohesion: 0.24
Nodes (8): mapUserDtoToDomain(), UserDto, UserRepositoryImpl, User, UserRepository, GetUserProfileUseCase, useUserProfile(), UseUserProfileReturn

### Community 1 - "User"
Cohesion: 0.15
Nodes (21): useTranslation(), homePortalMockData, CtaBannerContract, FooterColumnContract, HomePortalContract, HowWeWorkStepContract, JobCategoryCardContract, PopularVacancyContract (+13 more)

### Community 2 - "UserRepository"
Cohesion: 0.07
Nodes (27): dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, jsdom, postcss (+19 more)

### Community 3 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+13 more)

### Community 4 - "useTheme.tsx"
Cohesion: 0.23
Nodes (8): App(), HomeNavbar(), ThemeContext, ThemeContextType, ThemeMode, ThemeProvider(), useTheme(), HomeLandingPage()

### Community 5 - "Local Platform Blueprint: React Web Portal (Maya)"
Cohesion: 0.13
Nodes (14): Core Architecture & Multi-Repo Ecosystem, 🎨 Design System: Web Desktop Blue & White, Dynamic Theme Tokens & Tailwind Integration:, Geolocation Feature (Added Jul 2026), Global System Map: MayaAgentJob, Local Platform Blueprint: React Web Portal (Maya), Local Project Directory Architecture, 🌐 Localization & Translation (i18n): (+6 more)

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
Cohesion: 0.29
Nodes (6): ⚡ Development & Test Commands, Gemini CLI & AI Rules (mayaagentjob-web), 📋 Mandatory Workflow: Platform Context Loading, 🔒 Strict Local Rules & Constraints, 🧪 Test Patterns, ⚡ Tooling: RTK & Graphify Usage

### Community 14 - "UserLocation"
Cohesion: 0.19
Nodes (12): mapNominatimDtoToDomain(), NominatimAddressDto, NominatimReverseDto, DEFAULT_LOCATION, DEFAULT_LOCATION, MOCK_COORDS, UserLocationRepositoryImpl, UserLocation (+4 more)

### Community 15 - "TranslationContext.tsx"
Cohesion: 0.15
Nodes (12): Locale, TranslationContext, TranslationContextType, TranslationProvider(), translations, en, id, HeroSearchSection() (+4 more)

### Community 16 - "CandidateOnboardingModal.tsx"
Cohesion: 0.28
Nodes (8): MockCandidateOnboardingRepository, ICandidateOnboardingRepository, OnboardingStep, ParsedResumeProfile, CandidateOnboardingModal(), CandidateOnboardingModalProps, useCandidateOnboardingViewModel(), UseCandidateOnboardingViewModelReturn

## Knowledge Gaps
- **96 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslation()` connect `User` to `CandidateOnboardingModal.tsx`, `useTheme.tsx`, `TranslationContext.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `UserLocationRepositoryImpl` connect `UserLocation` to `TranslationContext.tsx`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `User` be split into smaller, more focused modules?**
  _Cohesion score 0.1477832512315271 - nodes in this community are weakly interconnected._
- **Should `UserRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Local Platform Blueprint: React Web Portal (Maya)` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._