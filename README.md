# Maya Web Portal (React Admin Dashboard)

Welcome to the desktop and administrative web portal interface for **Maya: Your AI Career Agent** & **Lowker Job Search Automation Platform**.

This repository holds the evaluative and administrative web dashboard. It acts as a desktop companion to the mobile applications, giving users a full-page scrolling interface to search jobs, view AI-scored matches, filter by category, and manage their profile.

---

## 🏗️ Repository Role & Platform Context
Within the unified **MayaAgentJob** ecosystem:
- **Web Portal (`mayaagentjob-web/`)**: Evaluative/administrative desktop layout implementing `HomeLandingPage.tsx` and synchronized domain contracts (`HomePortalContract.ts`, `JobListing.ts`, `CandidateOnboardingContract.ts`).
- **Mobile Client (`mayaagentjob-mobile/`)**: Primary user platform for search, automation, and monetization across native iOS (`ios/`) and Android (`android/`).
- **Backend Service (`mayaagentjob-backend/`)**: Supabase PostgreSQL database, edge functions, and scoring logic.

### 🎨 Desktop Layout: Full-Page Scrolling Layout
The UI is a single-page scrollable experience (`src/presentation/pages/HomeLandingPage.tsx`):
1. **HomeNavbar**: Persistent top navigation bar.
2. **HeroSearchSection**: Search bar with location-aware greeting (browser geolocation via Nominatim reverse geocode).
3. **JobCategoriesBar**: Horizontal filter chips for category-based job filtering.
4. **JobListingSection**: Paginated grid of job cards with AI summary bullets, filtered by category/keyword.
5. **PopularVacanciesSection**: Highlighted vacancies with open position counts.
6. **HowWeWorkSection**: Three-step workflow illustration.
7. **DualCtaBannersSection**: Candidate and Employer call-to-action banners.
8. **HomeFooter**: Multi-column footer with quick links.

---

## 🛠️ Technical Stack
- **Framework:** React 18 + Vite (configured as a single-page application).
- **Language:** Strict TypeScript 5.x.
- **Styling:** Tailwind CSS (utility-first, dark-mode ready), styled dynamically via core design tokens.
- **Backend Integration:** Supabase JS Client wrapper services in the Data layer.
- **Subsystems:** Dynamic theme configuration (`src/core/theme/themeTokens.ts` feeding into `tailwind.config.js`) and multi-language translation support (`src/core/i18n/TranslationContext.tsx` supporting English and Indonesian).

---

## 🔒 Session & Entitlement Handling
- **GitHub Social Login**: Primary authentication flow via Supabase Auth SDK.
- **Mobile-First Entitlements**: This web portal does **not** process subscription payments or host checkout gateways. Instead, it checks the authenticated Supabase user profile table (`profiles.subscription_status`). Detailed AI breakdown utilities are unlocked only if a valid subscription was initiated via the native iOS/Android mobile clients.

---

## 🏗️ Clean Architecture & Directory Structure
This repository adheres strictly to **Feature-Based Modular Clean Architecture** principles:

```
mayaagentjob-web/
├── src/
│   ├── core/           # Shared infrastructure: i18n (TranslationContext.tsx, translations/en.ts, translations/id.ts), theme tokens (theme/themeTokens.ts)
│   ├── data/           # Data layer: DTOs/mappers (NominatimDto.ts, UserDto.ts), repository implementations (UserLocationRepositoryImpl.ts, UserRepositoryImpl.ts, MockJobListingRepository.ts), mock data (homePortalMockData.ts, jobListingsMockData.ts)
│   ├── domain/         # Domain layer: Pure entities (HomePortalContract.ts, JobListing.ts, CandidateOnboardingContract.ts, UserLocation.ts, User.ts), repository interfaces, use cases (FilterJobListingsUseCase.ts, GetUserLocationUseCase.ts, GetUserProfileUseCase.ts)
│   ├── presentation/   # Presentation layer: Pages (HomeLandingPage.tsx), components (home/HeroSearchSection.tsx, JobListingSection.tsx, etc.), hooks (useJobListings.ts, useUserLocation.ts, useUserProfile.ts, useTheme.tsx, useCandidateOnboardingViewModel.ts)
│   ├── shared/         # Common UI components, icons, and utilities
│   └── test/           # Test infrastructure: setup.ts (localStorage mock for jsdom)
├── .ai-context.md      # Active platform context blueprint (local rules/contracts)
├── AGENTS.md           # AI rules file (AI-agnostic, consolidated from CLAUDE.md + GEMINI.md)
└── README.md
```

### The 2026 Testing Guarantee (100% Pure Domain)
All code inside `src/domain/` (`HomePortalContract.ts`, `JobListing.ts`, `CandidateOnboardingContract.ts`, `UserLocation.ts`, `User.ts`) must be pure TypeScript with **zero external framework dependencies** (no React imports, UI styling, or web network SDKs). This ensures:
- Automated tests in Vitest run instantaneously without native emulators or DOM mocks.
- Tests are co-located next to source files with `.test.ts(x)` suffix.
- `src/test/setup.ts` provides browser API mocks (localStorage) for jsdom environment.
- **55 tests** across 9 test files covering DTO mapping, use cases, repositories (geolocation + job listing), hooks, and components.
- Clear decoupling of domain logic from network client details and UI presentation frameworks.

---

## ⚡ Tooling & Token Optimization
For local CLI operations, utilize **RTK (Rust Token Killer)** to optimize prompt limits and API token usage:
```bash
# Verify installation
rtk --version
rtk gain

# Git and CLI commands automatically run through the token killer proxy hook
git status
```
