# Elite Roadmap — AI UI Generation Prompt

Use this prompt in Google AI Studio Build Mode after importing the existing React/Vite candidate. Redesign UI only. Do not rewrite the domain model.

## Prompt

You are the lead product designer and senior React/Three.js engineer for Elite Roadmap. Create a calm, spacious, modern production workspace for learning DaVinci Resolve and reaching the first paid video-editing job.

This is not a generic SaaS dashboard, portfolio landing page, or neon cyberpunk control room. It is a focused personal production desk: one current action, four real Reel artifacts, clear evidence gates, and an early client-outreach path.

## Domain contracts

Inspect the existing source before editing. Preserve exactly:

```text
Phase IDs: setup, reel-1, reel-2, profile, reel-3, proposal, reel-4
Reel IDs: reel-01, reel-02, reel-03, reel-04
MP4 tasks: reel_01_artifact, reel_02_artifact, reel_03_artifact, reel_04_artifact
Job task: first_paid_job_gate
MP4 gates: exported-mp4, watched-end-to-end, audio-reviewed, subtitle-reviewed, org-clock-updated
```

Never rename, reorder, replace, or invent MP4 gate keys. Keep the contextual labels: Lang uses Org clock; Diễm uses in-app work time.

The content order is:

```text
Sean Kang setup → Reel 1 → Reel 2 → Profile + First Paid Job Gate → Reel 3/proposal in parallel → Reel 4
```

Sean Kang and local curriculum are the primary learning source. Preserve curriculum references `elite/1.2/P8.1`, `P8.2`, `P8.4`, and `P8.3`. Do not invent lessons, fake client results, market percentages, proposal quotas, revenue guarantees, ratings, or portfolio claims.

## Visual direction: Quiet Kinetic Production Desk

Use a spacious, calm, premium editorial workspace with low cognitive load. The current action must be obvious within two seconds.

Use this restrained palette. No harsh neon, saturated electric-blue overload, muddy brown gradients, or rainbow status colors:

```css
--canvas: #F3F5F7;
--surface: #FBFCFD;
--surface-raised: #FFFFFF;
--surface-soft: #E9EEF1;
--ink: #17212B;
--ink-soft: #44515D;
--ink-muted: #74818C;
--rule: #DCE3E8;
--sage: #86A89D;
--blue-grey: #8EAABA;
--dust-coral: #C88E82;
--amber-muted: #C7A56A;
--success: #5F9A84;
--cinema-black: #10151B;
```

Typography: `Be Vietnam Pro` for all UI/body text; use `Fraunces` for large titles only when Vietnamese glyph coverage is complete, otherwise use a distinctive heavy Be Vietnam Pro treatment; use `JetBrains Mono` only for measured values, IDs, timecodes, and gate counts. Body line-height is 1.55–1.65, body text is at least 16px, and text columns stay wide enough for Vietnamese readability.

## Layout

Desktop: quiet header; compact sidebar; large current-action panel; 4 Reel project cards; framed cinema rack; secondary pipeline/QC access; optional queue with at most three real task rows.

Mobile: compact header; current action and CTA; two-column Reel cards; cinema shelf or 2D fallback; bottom navigation. Do not compress paragraphs into cards or show every secondary module at once.

## Motion and Three.js

Keep the existing procedural Three.js rack: one canvas, four real canisters, responsive camera, semantic HTML controls, no continuous requestAnimationFrame loop, render only on mount/resize/selection/interaction, stop when the tab is hidden, and use 2D fallback for reduced motion or WebGL failure. Use motion only for deliberate actions such as Reel focus, drawer opening, and restrained scroll parallax. No particle field, idle animation, or animation on every card.

## Required hooks

Preserve every existing DOM hook, including: `hero`, `next-action-panel`, `data-testid="next-action-panel"`, `hero-title`, `hero-subtitle`, `countdown-badges`, `id="countdown-badges"`, `data-primary-action="open-gate-checklist"`, `reel-rack`, `semantic-cards`, `semantic-reel-cards`, `semantic-card-{reel.id}`, `artifact-inspector`, `active-artifact-inspector`, `pipeline-spine`, `qc-ledger`, `artifact-reel-rack`, `data-render-mode`, `data-all-canisters-visible`, `three-reel-canvas`, `id="three-reel-canvas"`, `fallback-2d-reel-grid`, `data-reel-slot`, and `data-artifact-mp4`.

The CTA must open the checklist directly. Desktop uses a right slide-over; mobile uses a bottom sheet. Escape closes, body scroll locks, focus returns to the opener, and all interactive targets are at least 44px.

## Scope boundaries

Use the real data adapter. Do not invent demo data, KinoVault, Cannes, fake analytics, fake team members, or market claims. Do not add Firebase/Auth/RTDB/ntfy. Do not migrate to Next.js, TanStack Start, Supabase, or a backend. Keep React + Vite, the existing Three.js/2D fallback, and the original Vanilla app untouched. Do not install dependencies unless already required.

## Required workflow

1. Inspect the adapter, App shell, CSS, ReelRackStage, and Inspector before editing.
2. Show a short implementation plan and token map before coding.
3. Implement shell/typography, then current-action hierarchy, then Reel cards/secondary disclosures, then rack/motion.
4. Run lint, build, and existing tests.
5. Verify desktop, 390px mobile, reduced motion, 2D fallback, keyboard focus, drawer behavior, and no horizontal overflow.
6. Report changed files, verification, warnings, and unverifiable contracts.

## Acceptance criteria

The learner identifies the next action in two seconds; the first viewport has no wall of text; Vietnamese diacritics never clip; colors remain calm; the result feels contemporary without being a generic AI dashboard; four Reels remain understandable; the rack is delightful but secondary; checklist, fallbacks, keyboard access, and 390px layout work; existing tests/hooks remain intact; no fake data or claims are introduced.

Export the candidate and continue local verification. Generated UI is not the source of truth until the local test suite passes.
