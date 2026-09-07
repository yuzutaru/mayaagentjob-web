# AI Rules & Workspace Protocol (mayaagentjob-web)

This guide defines coding standards, command execution, and architectural rules for the **React Web Portal** repository.

---

## Development & Build Commands

```bash
# Run local dev server (default port 5173)
npm run dev

# Build production bundle (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Run type checks
npx tsc --noEmit

# Run unit tests (Vitest, CI mode)
npm run test

# Run unit tests in watch mode
npm run test:watch

# Sync generated API types + shared CV templates from backend (requires running backend)
cd .. && npm run sync-api
```

> Note: there is **no `lint` npm script** in this repo — use `npx tsc --noEmit` (types) and `npm run test` + `npm run build` (correctness).

---

## Mandatory Workflow: Platform Context Loading

Before writing code or proposing changes:
1. **Load Local Blueprint**: Always read `.ai-context.md` at the root of `mayaagentjob-web/` to understand component boundaries, styling configurations, and current data models.
2. **Review Domain Types**: Inspect files in `src/domain/` (`HomePortalContract.ts`, `JobListing.ts`, `CandidateOnboardingContract.ts`, `UserLocation.ts`, `User.ts`, `JobListingRepository.ts`) to verify that any data mapping aligns with synchronized domain types.
3. **Review Generated API Types**: Check `src/data/api/generated/api.d.ts` — this is auto-generated from the backend OpenAPI spec. Import REST API response types via `import type { components } from '@api/generated/api'` when building real API data sources.
4. **Check Layout Architecture**: Verify that UI modifications adhere to the Full-Page Scrolling Layout in `src/presentation/pages/HomeLandingPage.tsx`.
5. **Reference Global Rules**: Consult `.agents/AGENTS.md` for multi-repo workspace invariants.

---

## Architectural Boundaries & Synchronized Contracts

All work in `mayaagentjob-web` must strictly follow **Feature-Based Modular Clean Architecture** and the **2026 Testing Guarantee**:

1. **100% Pure Domain Rule**:
   - Files in `src/domain/` (`HomePortalContract.ts`, `JobListing.ts`, `CandidateOnboardingContract.ts`, `UserLocation.ts`, `User.ts`, `JobListingRepository.ts`, `FilterJobListingsUseCase.ts`) must be 100% pure TypeScript.
   - **Zero imports** of React components, hooks, style libraries, or Supabase network client SDKs.
   - Keep domain entities readonly to avoid accidental mutations.

2. **Synchronized Domain Contracts**:
   - Ensure `src/domain/entities/HomePortalContract.ts` stays consistent with the native clients' contracts (`mayaagentjob-android`, `mayaagentjob-ios`).
   - Network payloads and API responses must be typed as Data Transfer Objects (DTOs) in `src/data/`.
   - Implement mapper functions in the Data layer to map DTOs into pure Domain entities.
   - The Presentation layer (`HomeLandingPage.tsx`) must only consume Domain entities, never raw DTOs.
   - **Shared CV templates**: `src/data/cvTemplates/*.html` are copied from `mayaagentjob-backend-python/src/data/export/templates/` by `npm run sync-api`. Keep the web twin renderer `src/presentation/components/cv/resumeTemplateRenderer.ts` **byte-identical** to the backend `resume_template_renderer.py` — golden fixtures under `src/presentation/components/cv/__fixtures__/` are asserted in tests. Re-run `npm run sync-api` after backend template changes.

3. **No Checkout Forms (Stripe Isolation)**:
   - Do **NOT** write Stripe form elements, checkout buttons, or invoice gateways in the web dashboard.
   - Entitlements must be read directly from the user profile: `profiles.subscription_status`.

4. **Session Guard Enforcement**:
   - Layout components must securely check and propagate Supabase Auth state.
   - Prevent rendering authenticated dashboard modules when session status is invalid.

5. **Strict Layer Isolation**:
   - UI views (`HomeLandingPage.tsx`) must never execute raw PostgREST queries or fetch queries directly.
   - All network and Supabase transactions must reside in `src/data/` following interfaces defined in `src/domain/`.

6. **Centralized Theme Token Adherence**:
   - UI styles extending Tailwind configurations must map to design tokens declared in `src/core/theme/themeTokens.ts`. Avoid hardcoded layout parameters.

7. **Multi-Language Web Localization (i18n)**:
   - All text copy exposed in layouts must use `useTranslation()` from `src/core/i18n/TranslationContext.tsx`. Do not write hardcoded labels or placeholders.

8. **Testing Pattern**:
   - Tests are co-located next to source files with `.test.ts(x)` suffix.
   - Vitest is configured in `vite.config.ts` with jsdom environment and globals enabled.
   - Browser API mocks (localStorage, geolocation, fetch) go in `src/test/setup.ts`.
   - Pure domain/data tests (DTO mappers, use cases) need no DOM setup.
   - Hook/component tests should mock repository dependencies via `vi.mock`.
   - Run `npm run test` for CI mode or `npm run test:watch` for development. **93 tests across 17 test files** currently pass with zero failures.

9. **Autonomous Planning Protocol**:
   - Always output an Implementation Plan and Checklist (`task.md`) before writing any UI routes, layouts, or data hooks.

---

## Design System & Layout Rules

- **Full-Page Scrolling Layout**: The landing page (`src/presentation/pages/HomeLandingPage.tsx`) is a single-page scrollable experience: `HomeNavbar` → `HeroSearchSection` (portfolio/PDF positioning) → `FeaturesSection` (Portfolio Web Builder, PDF & CV Export, AI Job Matching) → `HowWeWorkSection` → `DualCtaBannersSection` (→ `/portfolio`, `/jobs`) → `HomeFooter`. The "PDF & CV Export" card opens **`CvExportPage` at `/cv-export`** — a **blank-start CV builder** on a fixed default template (`ats-minimal`): full manual editor (`PortfolioEditor`) + live WYSIWYG A4 paper preview (`ResumePreview`) + **Download CV (PDF)** via `builder.exportPdf()`. The portfolio website builder lives at `/portfolio` (`PortfolioBuilderPage`) — also blank-start manual input (`PortfolioEditor` → live `PortfolioPreview`) with self-contained HTML / PDF CV export and reset. **Platform import is hidden for now (manual input only):** `SourcePicker` / `ProviderImportForm` (GitHub/GitLab/LinkedIn-PDF etc.) and "Load Sample" are unused in the UI (components kept in place for later re-enable); the backend `/portfolio/import/*` endpoints and domain/data import code remain intact. Editor step is labelled `1.` (single-step flow). The job-matching experience lives on a separate route: `FindJobsPage` (`/jobs`) hosts `JobCategoriesBar` (active category state lifted to page, drives `useJobListings` filter), `FloatingSearchBar`, `JobListingSection` (paginated grid, 9 per page, filtered by category + keyword search), and `PopularVacanciesSection`.
- **Tailwind CSS Utility Classes**: Use standard classes. Canvas background is `bg-slate-50` (light) / `bg-career-dark` (dark).
- **Vanilla CSS (if needed)**: Declare animations and custom variables inside `src/index.css`.

---

## Tooling: RTK Usage

- All git commands run transparently via the **RTK (Rust Token Killer)** hook (`rtk gain`, `rtk discover`).
- **Graphify** (if the `graphify` CLI is available): keep the code knowledge graph fresh with `graphify update .` after large changes — graph output lives in `graphify-out/`. Rebuild it whenever you change the file layout or add routes/components.
