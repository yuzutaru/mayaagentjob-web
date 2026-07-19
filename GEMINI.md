# Gemini CLI & AI Rules (mayaagentjob-web)

This guide documents the strict development rules, context-loading workflows, and platform specifications for Gemini agents operating in the web portal repository.

---

## 📋 Mandatory Workflow: Platform Context Loading

Before writing code or proposing changes:
1. **Load Local Blueprint**: Always read `.ai-context.md` at the root of `mayaagentjob-web/` to understand component boundaries, styling configurations, and current data models.
2. **Review Domain Types**: Inspect files in `src/domain/` (`HomePortalContract.ts`) to verify that any data mapping aligns with synchronized domain types.
3. **Check Layout Architecture**: Verify that UI modifications adhere to the Split-Pane Master-Detail Grid in `src/presentation/pages/HomeLandingPage.tsx`.
4. **Reference Global Rules**: Consult `.agents/AGENTS.md` for multi-repo workspace invariants.

---

## 🔒 Strict Local Rules & Constraints

1. **No Stripe Payment Integration**:
   - The web app operates strictly as an evaluative view.
   - Do **NOT** code Stripe checkouts, subscription purchase buttons, or credit card inputs.
   - Verifying entitlement relies solely on query checks against `profiles.subscription_status`.

2. **Session Guard Enforcement**:
   - Layout components must securely check and propagate Supabase Auth state.
   - Prevent rendering authenticated dashboard modules when session status is invalid.

3. **Strict Layer Isolation**:
   - UI views (`HomeLandingPage.tsx`) must never execute raw PostgREST queries or fetch queries directly.
   - All network and Supabase transactions must reside in `src/data/` following interfaces defined in `src/domain/`.

4. **Centralized Theme Token Adherence**:
   - UI styles extending Tailwind configurations must map to design tokens declared in `src/core/theme/themeTokens.ts`. Avoid hardcoded layout parameters.

5. **Multi-Language Web Localization (i18n)**:
   - All text copy exposed in layouts must use `useTranslation()` from `src/core/i18n/TranslationContext.tsx`. Do not write hardcoded labels or placeholders.

6. **Autonomous Planning Protocol**:
   - Always output an Implementation Plan and Checklist (`task.md`) before writing any UI routes, layouts, or data hooks. Refer to [MOBILE_ONBOARDING_IMPLEMENTATION_PLAN.md](file:///Users/yuzutaru/Development/mayaagentjob-workspace/MOBILE_ONBOARDING_IMPLEMENTATION_PLAN.md) in the workspace root as a guideline.

---

## ⚡ Development & Test Commands

```bash
# Run local dev server (default port 5173)
npm run dev

# Build production bundle (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Run unit tests (Vitest, CI mode)
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run type checks
npx tsc --noEmit
```

## 🧪 Test Patterns
- Tests are co-located next to source files (e.g., `NominatimDto.test.ts` next to `NominatimDto.ts`).
- Vitest configured in `vite.config.ts` with jsdom environment and globals enabled.
- Browser API mocks (localStorage, geolocation, fetch) live in `src/test/setup.ts`.
- 21 tests across 5 files covering DTO mappers, use cases, repository, hooks, and components.

## ⚡ Tooling: RTK & Graphify Usage
- Ensure all CLI scripts and git actions utilize RTK (Rust Token Killer): `rtk gain`, `rtk discover`.
- Refresh code knowledge graph after structural updates: `graphify update .`.
