# Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)

This guide defines coding standards, command execution, and architectural rules for the **React Web Portal** repository.

---

## ⚡ Development & Build Commands

```bash
# Run local dev server (default port 5173)
npm run dev

# Build production bundle (outputs to dist/)
npm run build

# Preview production build locally
npm run preview

# Run lint checks
npm run lint

# Run type checks
npx tsc --noEmit

# Run unit tests (Vitest)
npm run test
```

---

## 🏗️ Architectural Boundaries & Synchronized Contracts

All work in `mayaagentjob-web` must strictly follow **Feature-Based Modular Clean Architecture** and the **2026 Testing Guarantee**:

1. **100% Pure Domain Rule**:
   - Files in `src/domain/` (`HomePortalContract.ts`) must be 100% pure TypeScript.
   - **Zero imports** of React components, hooks, style libraries, or Supabase network client SDKs.
   - Keep domain entities readonly to avoid accidental mutations.

2. **Synchronized Domain Contracts**:
   - Ensure `src/domain/entities/HomePortalContract.ts` matches the domain contract in `mayaagentjob-mobile` (`src/features/job-matching/domain/HomePortalContract.ts`).
   - Network payloads and API responses must be typed as Data Transfer Objects (DTOs) in `src/data/`.
   - Implement mapper functions in the Data layer to map DTOs into pure Domain entities.
   - The Presentation layer (`HomeLandingPage.tsx`) must only consume Domain entities, never raw DTOs.

3. **No Checkout Forms (Stripe Isolation)**:
   - Do **NOT** write Stripe form elements, checkout buttons, or invoice gateways in the web dashboard.
   - Entitlements must be read directly from the user profile: `profiles.subscription_status`.

4. **Autonomous Planning Protocol**:
   - Always output an Implementation Plan and Checklist (`task.md`) before writing any UI routes, layouts, or data hooks. Refer to [MOBILE_ONBOARDING_IMPLEMENTATION_PLAN.md](file:///Users/yuzutaru/Development/mayaagentjob-workspace/MOBILE_ONBOARDING_IMPLEMENTATION_PLAN.md) in the workspace root as a guideline.

---

## 🎨 Design System & Split-Pane Layout Rules

- **Split-Pane Master-Detail Grid**: Implement the three-pane desktop layout (`src/presentation/pages/HomeLandingPage.tsx` with sidebar navigation, center scrollable job feed, and right interactive matrix form).
- **Tailwind CSS Utility Classes**: Use standard classes. Canvas background is `#FFFFFF` (light) / `#020617` (dark).
- **Vanilla CSS (if needed)**: Declare animations and custom variables inside `src/index.css`.

---

## ⚡ Tooling: RTK & Graphify Usage

- All git and build operations run transparently via the **RTK (Rust Token Killer)** hook (`rtk gain`, `rtk discover`).
- Refresh code knowledge graph after structural updates: `graphify update .`.
