# Claude Code AI Rules & Workspace Protocol (mayaagentjob-web)

This guide defines coding standards, command execution, and architectural rules for the **React Web Portal** repository.

---

## ⚡ Development & Build Commands

Since this is a standard React and Vite skeleton, use standard npm scripts once dependencies and packages are configured:

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

## 🏗️ Architectural Boundaries

All work in `mayaagentjob-web` must strictly follow **Feature-Based Modular Clean Architecture** and the **2026 Testing Guarantee**:

1. **100% Pure Domain Rule**:
   - Files in `src/domain/` (entities, use cases, repository interfaces) must be 100% pure TypeScript.
   - **Zero imports** of React components, hooks, style libraries, or Supabase network client SDKs.
   - Keep domain entities readonly to avoid accidental mutations.

2. **Decoupled Data Mapping**:
   - Network payloads and API responses must be typed as Data Transfer Objects (DTOs) in `src/data/dtos/`.
   - Implement mapper functions in the Data layer to map DTOs into pure Domain entities.
   - The Presentation layer must only consume Domain entities, never raw DTOs.

3. **No Checkout Forms (Stripe Isolation)**:
   - Do **NOT** write Stripe form elements, checkout buttons, or invoice gateways in the web dashboard.
   - Entitlements must be read directly from the user profile: `profiles.subscription_status`.

---

## 🎨 Design System & CSS Rules

- **Tailwind CSS Utility Classes**: Use standard classes. Canvas background is `#FFFFFF` (light) / `#020617` (dark).
- **Responsive Elements**: Sidebar is persistent on desktop. Matrix form resides in the right panel.
- **Vanilla CSS (if needed)**: Declare animations and custom variables inside `index.css`.

---

## ⚡ Token Optimization (RTK)

- All git and build operations run transparently via the **RTK (Rust Token Killer)** hook.
- Run `rtk gain` to see token analytic data, or `rtk proxy <cmd>` to debug commands.
