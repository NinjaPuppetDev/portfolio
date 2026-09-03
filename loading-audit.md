# Loading / Intro Overlay Audit

## Scope

Investigated why the hero can appear briefly before `IntroOverlay` on refresh. The primary fixes have now been applied in `IntroOverlay.tsx`.

## Applied fixes

- Removed the `mounted` render gate so the black fixed overlay is present in the server-rendered HTML and the first client render.
- Preserved the existing loading mode and lock behavior after hydration.
- Made the `load` and fallback completion path idempotent so only one completion sequence can run.
- Added cleanup for the fallback, unlock, and fade timers.

## Finding: the overlay is mounted too late

**Severity: High / user-visible first-paint race**

`IntroOverlay` starts with `mounted = false` and returns `null` while either `mounted` is false or `visible` is false. The black fixed layer therefore does not exist in the server-rendered HTML or in the first client render.

The overlay only becomes renderable after its `useEffect` runs and calls `setMounted(true)`. React effects run after the initial render, so the already-rendered `LandingPage` can paint first. The sequence is:

1. Next.js renders `RootLayout` and `LandingPage`.
2. `IntroOverlay` renders `null` because `mounted` is initially `false`.
3. The hero is present in the initial page output and can be painted.
4. Hydration completes and the overlay effect runs.
5. `setMounted(true)` causes a second render, inserting the black overlay.
6. The overlay then waits for the load condition and minimum duration before fading out.

The overlay's `zIndex: 9999` cannot prevent this race because z-index only affects an element after that element has been mounted.

Evidence: [IntroOverlay.tsx](app/components/IntroOverlay.tsx) has the initial `mounted` state, the `useEffect` that sets it, and the `if (!mounted || !visible) return null` guard. [layout.tsx](app/layout.tsx) places the overlay in the tree, but does not provide a pre-hydration loading shell. [page.tsx](app/page.tsx) renders `LandingPage` immediately.

## Finding: no pre-hydration loading gate exists

**Severity: High / reinforces the primary race**

There is no route-level `loading.tsx`, inline blocking script, server-rendered overlay element, or CSS rule that hides the page until the intro overlay is ready. The black `body` background only covers the body background; it does not suppress the server-rendered hero content.

The existing global pseudo-elements are texture and vignette layers. They do not act as a loading mask. The `ExperimentProvider` also does not gate the page: it wraps only the floating chat and navigation, while `LandingPage` is rendered outside it.

Evidence: [globals.css](app/globals.css) defines the body background and visual pseudo-elements but no loading selector. [ExperimentProvider.tsx](app/components/ExperimentProvider.tsx) controls experiment labeling after hydration, not initial page visibility.

## Finding: the store lock is initialized after the first render

**Severity: Medium / interaction state is also late**

The Vera store starts as `mode: 'dock'` and `locked: false`. `IntroOverlay` changes these values to `loading` and `true` only inside its post-hydration effect. This means the store cannot protect the first render from showing the hero, and other client components can observe the unlocked initial state briefly.

Evidence: [veraStore.ts](app/store/veraStore.ts) initializes the store unlocked. [IntroOverlay.tsx](app/components/IntroOverlay.tsx) applies the loading mode and lock only after mounting.

## Finding: completion can be scheduled more than once

**Severity: Medium / timing stability risk**

When the document is not complete, `IntroOverlay` registers a `load` listener and starts a 2.5-second fallback timer. Both call `finish`, but `finish` does not mark itself complete or cancel the fallback timer. If the `load` event fires before the fallback, two independent completion sequences can be scheduled. They both unlock the store and schedule fade state changes.

This is not the cause of the hero-before-overlay flash, but it can make fade timing and state transitions less deterministic. The timers created inside `finish` are also not retained for cleanup.

## What is not causing the initial flash

- The overlay's z-index is not the controlling issue; the element is absent before hydration.
- `LandingPage` is not conditionally waiting for the overlay; it is rendered directly by [page.tsx](app/page.tsx).
- The hero's `mounted` state changes its glitch text and responsive behavior, but the hero section itself renders immediately.
- The image and font loading paths may change visual timing, but they do not create the primary ordering bug.

## Recommended remediation direction

The loading mask must exist in the initial HTML or be applied by a pre-hydration mechanism. The most reliable approaches are:

1. Render a server-visible loading shell or overlay in the layout and let the hydrated `IntroOverlay` take over its exit state.
2. Add a tiny inline pre-hydration gate that hides the page before React runs, with a deterministic handoff to the hydrated overlay.
3. If the desired behavior is route-level loading rather than first-paint choreography, use a Next.js `loading.tsx`, recognizing that it does not always replace a same-document refresh race as precisely as an initial HTML gate.

Any implementation should also make the completion path idempotent and clear the fallback and animation timers during cleanup.

## Verification status

The source fix was validated with focused ESLint and editor diagnostics for [IntroOverlay.tsx](app/components/IntroOverlay.tsx). No browser timing capture was performed. The primary diagnosis was directly supported by the initial state, null guard, effect timing, and immediate `LandingPage` render described above.
