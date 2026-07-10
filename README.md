# Maya Web Portal (React Admin Dashboard)

Welcome to the desktop and administrative web portal interface for **Maya: Your AI Career Agent** & **Lowker Job Search Automation Platform**.

This repository holds the evaluative and administrative web dashboard. It acts as a desktop companion to the mobile applications, giving users a split-pane interface to view job matches, edit profile requirements, and inspect AI-driven application metrics.

---

## 🏗️ Repository Role & Platform Context
Within the unified **MayaAgentJob** ecosystem:
- **Web Portal (`mayaagentjob-web/`)**: Evaluative/administrative desktop layout implementing `HomeLandingPage.tsx` and synchronized `HomePortalContract.ts`.
- **Mobile Client (`mayaagentjob-mobile/`)**: Primary user platform for search, automation, and monetization across native iOS (`ios/`) and Android (`android/`).
- **Backend Service (`mayaagentjob-backend/`)**: Supabase PostgreSQL database, edge functions, and scoring logic.

### 🎨 Desktop Layout: Split-Pane Master-Detail Grid
The UI uses a master-detail grid maximizing desktop screen real estate (`src/presentation/pages/HomeLandingPage.tsx`):
1. **Left Sidebar**: Persistent navigation panel (Feed, Saved/Applied, Subscription Tier Status).
2. **Middle Feed**: Dynamic, scrollable layout of matching job cards (`src/presentation/components/home/`).
3. **Right Panel**: Interactive Matrix Form (allows real-time profile editing and automatic search feed updates).

---

## 🛠️ Technical Stack
- **Framework:** React 18 + Vite (configured as a single-page application).
- **Language:** Strict TypeScript 5.x.
- **Styling:** Tailwind CSS (utility-first, dark-mode ready).
- **Backend Integration:** Supabase JS Client wrapper services in the Data layer.

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
│   ├── core/           # Shared API clients, base Supabase client, HTTP wrappers
│   ├── shared/         # Common UI components, icons, theme tokens, and hooks
│   ├── data/           # Layer: Repositories implementation, mock feeds, and mapping
│   ├── domain/         # Layer: Pure Entities (HomePortalContract.ts), Use cases, Interfaces
│   └── presentation/   # Layer: React Components (HomeLandingPage.tsx), layouts, hooks
├── graphify-out/       # Graphify code knowledge graph and navigation tree
├── .ai-context.md      # Active platform context blueprint (local rules/contracts)
└── README.md
```

### The 2026 Testing Guarantee (100% Pure Domain)
All code inside `src/domain/` (`HomePortalContract.ts`) must be pure TypeScript with **zero external framework dependencies** (no React imports, UI styling, or web network SDKs). This ensures:
- Automated tests in Jest/Vitest run instantaneously without native emulators or DOM mocks.
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

### Graphify Code Knowledge Graph
Keep code structure relationships indexed using Graphify:
```bash
graphify update .
```
