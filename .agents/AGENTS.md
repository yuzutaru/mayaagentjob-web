# MayaAgentJob Web Portal AI Rules & Protocol

This file defines the strict repository rules and guidelines for AI agents editing the `mayaagentjob-web` repository.

---

## 1. Unified Multi-Repo Ecosystem & Architecture

The workspace is a hybrid multi-repo unified by a local MCP server.
- Whenever Supabase API responses or models change in the backend, data-transfer objects (DTOs) in the client directories must be updated in sync.
- The web portal must stay synchronized with database schemas defined in the backend and domain structures defined in the mobile client where overlapping structures occur (e.g. `JobListingCard` and `UserProfile`).

---

## 2. Mandatory Platform Context Loading

Before working on any feature:
1. Always load the `.ai-context.md` file in the web repository root first.
2. If changing shared contract types, check the mobile client (`mayaagentjob-mobile/src/features/job-matching/domain/entities/`) or the backend model equivalents to ensure structural alignment.

---

## 3. Clean Architecture & The 2026 Testing Guarantee

- **The 100% Pure Domain Rule**:
  - The Domain layer (`src/domain/`) must not import React, UI components, styling, or network client SDKs (like Supabase client or fetch wrappers).
  - Domain models must be pure TypeScript interfaces or classes.
- **Client Mappers**:
  - Ensure DTOs (`src/data/dtos/`) map cleanly to Domain entities using mapper functions before passing them to the UI.

---

## 4. Platform-Specific Architectural Boundaries

- **Web Portal Boundary**:
  - The portal is an evaluative and administrative console.
  - Subscription entitlement clearance is checked strictly via the database column `subscription_status` on the user profile, which is cleared by mobile purchases. No direct payment processing gateways should be wired locally.

---

## 5. Autonomous Planning Protocol

- Always generate an Implementation Plan and a task checklist (`task.md`) before writing code changes to ensure all changes are tracked and consistent.
