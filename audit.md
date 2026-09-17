# Architectural & Code Health Audit

Scope: `/app` and `/components` (with API route review from `/app/api`). This is a high-level audit for readiness before migrating English copy to `next-intl`.

---

## 1) Architecture & App Router

### Overall structure

The repository uses the Next.js App Router pattern in a broadly correct way:

- Root app shell is defined in `app/layout.tsx`.
- The homepage is a thin route entry in `app/page.tsx`.
- Route-specific layouts exist for work and work-with-me flows.
- There is a clear separation between route groups and feature sections.

This is good for a portfolio site, and the route map is understandable.

### Server vs. Client component boundaries

The main concern is that the application is more client-heavy than necessary for a content-driven marketing/product portfolio.

Examples of client-first composition:

- `app/layout.tsx` mounts global UI like `Cursor`, `VeraCompanion`, `IntroOverlay`, `FloatingChat`, and `Navigation` inside a client boundary.
- `app/work/layout.tsx` and `app/work-with-me/layout.tsx` are marked as client components solely to call hooks like `useVeraMode`.
- Several key files under `app/components` begin with `'use client'`, including navigation, hero, landing pages, chat, and experiment logic.

This creates an architecture where the site behaves like a rich single-page app rather than a server-first content app. The risk is not correctness; it is maintainability and localization readiness. When English copy must be migrated to a locale system, deeply embedded literals and client-side composition become harder to extract cleanly.

### Routing hygiene

The routing model is simple and mostly healthy:

- Root-level navigation uses `next/link` and route-based anchors like `/work/...` and `/#work`.
- Some custom scroll logic is used for anchor-style navigation on the homepage.
- Dynamic work pages appear to be structured with static route folders under `app/work/[slug]/page.tsx`, which is a sensible pattern.

What is less ideal:

- A lot of navigation and chat logic is coupled to browser DOM APIs (`document.getElementById`, `window.history.pushState`, `window.open`) in client components.
- Route semantics are mixed with product/personalization behavior, which makes future routing changes more fragile.

### Architectural conclusion

The app is functionally coherent and visually polished, but the app shell is not strongly server-first. For a multilingual refactor, the next major win would be to separate:

1. server-rendered content/layout shell,
2. client-only interactive system layer,
3. localized content/data layer.

---

## 2) TypeScript & Types

### Current state

The codebase is not broadly unsafe from a TypeScript perspective, but it also is not strongly typed at the architecture boundary.

### What is acceptable

- Many props and local data structures are explicitly typed via interfaces.
- `useState` generics are used as expected.
- Most route handlers in `app/api` do validation before processing requests.

### Loose typing / weak points

The main type issues are concentrated in browser-global access and ad hoc prop objects:

- `app/components/ExperimentProvider.tsx` uses `(window as any).gtag` and `(window as any).clarity`.
- This is a clear bypass of type safety and should be replaced with a typed analytics shim or a narrow browser-type declaration.
- The app often uses inline object literals and repeated local types instead of shared domain contracts.
- The same theme/nav shapes are recreated in multiple components (`Theme`, `NavItem`, etc.), which is manageable now but not scalable.

### Type health summary

There is no widespread `any` crisis, but there are enough loose points around browser APIs and repeated interface duplication to make the app less robust than it should be before a large translation migration.

---

## 3) Accessibility (a11y) Baseline

### Good news

- Some meaningful accessibility work is present: `button` controls include labels, and the floating chat has a `role="dialog"` and a descriptive `aria-label`.
- Mobile menu includes `aria-expanded` on the trigger.
- There is some use of `aria-label` on controls, which is better than nothing.

### Weak points

The app is visually strong but structurally weaker from an accessibility standpoint.

#### Missing semantic landmarks

- The root page layout does not strongly establish a semantic page hierarchy around `main`, `header`, and `nav` at a global level.
- Some content sections are plain `div`s rather than explicit landmarks.
- The landing page has a `main` in `LandingPage`, which is good, but the rest of the site still leans on generic `div` wrappers.

#### Form semantics

- `ContactForm` has labels and validation, but there is no strong pattern of `id`/`htmlFor`, `aria-describedby`, or explicit invalid state attributes.
- The app relies heavily on custom styling and event hooks, which can degrade accessibility if not paired with solid semantics.

#### Images / media

- The audited files do not show a broad pattern of missing `alt` attributes on key `img` elements, but the app also relies on background-image styling for many visual assets.
- This is acceptable for decorative visuals, but it means accessibility is less deliberate and more implicit than it should be for content-heavy pages.

#### Interactive controls

- Many buttons are styled to look custom, but they are not consistently built with a semantic pattern for focus-visible, keyboard flow, and screen-reader clarity.
- This is especially important because the app includes modal-like interfaces and chat flows.

### A11y conclusion

The app is not inaccessible in the obvious sense, but it is not yet built around a robust semantic accessibility baseline. This becomes more important as content grows and as more localized or translated UI is introduced.

---

## 4) Backend / API Handling

### Route handlers

The app contains several route handlers in `app/api` with generally good structure and validation patterns:

- `app/api/contact/route.ts` validates required fields and email format before sending the email.
- `app/api/discovery/route.ts` adds a rate limit layer and attempts to validate the payload carefully.
- `app/api/chat/route.ts` acts as a LLM orchestration layer to Groq and includes fallback handling when the API is unavailable.
- `app/api/body/aggregate/route.ts` uses a cron secret check and aggregates body-signals before posting to Bluesky.
- `app/api/body/sense/route.ts` sanitizes and caps inbound signal rows before insertion to Supabase.

### Good patterns

- Basic request validation is present.
- API failures are handled with structured JSON errors.
- There is rate-limiting in the discovery form path.
- There is a CRON auth check on the body aggregation route.

### Risks / watch-outs

- The chat route is a large orchestration layer with prompt engineering and logic embedded directly in a route file. That is workable, but it is a poor fit for content translation and future editing because the prompt and routing rules are tightly coupled.
- The frontend calls fetch APIs directly in client components without a centralized API contract layer; this is manageable now but tends to drift over time.
- Route handlers are not using a shared validation schema (for example Zod or a typed request contract), so request shape drift is likely as the platform grows.
- There are no obvious Server Actions in play; the project is using route handlers as the app’s server-side API layer, which is okay but should be kept disciplined.

### Backend summary

The backend layer is serviceable, with validation and basic guardrails in place. It is not yet a highly structured server API architecture, but it is not chaotic either. It is a reasonable starting point before a broader internationalization refactor.

---

## 5) Top Priorities Before `next-intl` Migration

These are the 5 highest-priority cleanup items before migrating English copy to `next-intl`:

1. Separate content from UI logic
   - A large amount of English copy is embedded directly inside components and route logic.
   - This makes translation extraction and locale switching much harder than it needs to be.

2. Make the client/server boundary cleaner
   - The app currently opts into client components too early and too often.
   - The result is a fragile mix of route structure, global state, and browser DOM logic that makes locale-aware rendering harder to reason about.

3. Replace ad hoc `any` browser access with typed wrappers
   - `window as any` usage in analytics/setup code should be hidden behind a typed abstraction.
   - This reduces runtime risk and improves refactor confidence.

4. Strengthen semantic accessibility standards
   - Add consistent landmarks, focus styles, and form/aria patterns.
   - This will reduce issues as the site grows and as new translations are introduced.

5. Standardize API and content contracts
   - Move to a shared request validation layer and a single content schema/translation contract.
   - This reduces future drift and lets i18n fit into a cleaner app architecture.

---

## Final assessment

This repository is a strong portfolio prototype: visually distinctive, routeable, and built with a clear product-experience style. The main limitations are not technical failure; they are architectural drift and content coupling. The codebase is dynamic and feature-rich, but it still needs structural cleanup before it is an ideal fit for a full localization and internationalization pass.

If the goal is to move to `next-intl` cleanly, the most important move is to treat translation as a product architecture problem first, not a styling problem second.
