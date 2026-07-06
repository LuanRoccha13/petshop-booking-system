# 21 - Antigravity Execution Prompt Template - Template Inspired Pass

Use this prompt when you want the antigravity to implement the next UI pass using the steno-inspired structure and motion rules.

## Prompt Base

Use the specifications in this folder as mandatory source of truth for design, UX and behavior.

Read these files before making changes:

- 01-brand-direction.md
- 02-design-tokens.md
- 03-motion-system.md
- 04-component-specs.md
- 05-page-recipes.md
- 06-copy-voice.md
- 07-accessibility-quality-gates.md
- 09-image-asset-system.md
- 11-layout-error-fixes.md
- 14-roles-and-permissions.md
- 15-scheduling-availability.md
- 16-permission-matrix.md
- 20-template-inspired-structure-motion.md
- 22-hard-acceptance-and-evidence-gate.md

Task of the pass:

- Rework the current frontend so it keeps the petshop identity, but adopts the premium editorial structure and motion rhythm described in the template-inspired spec.
- Prioritize the public landing, login, register, dashboard and 404 screens.
- Preserve the existing image upload flow based on file upload and URL storage. Do not reintroduce Base64.
- Keep the role boundaries for client, employee and admin visible in the UI.

Mandatory scope (non-negotiable):

1. You must deliver visible structural changes in all 5 pages: Landing, Login, Register, Dashboard and 404.
2. You must implement the minimum motion criteria from spec 20 for each page.
3. You must not deliver a cosmetic-only pass.

Implementation rules:

1. Do not copy the template literally.
2. Use the template only as inspiration for hierarchy, pacing, section rhythm and motion.
3. Keep the petshop palette, tokens and component language as the base system.
4. Use motion to guide attention and reveal content, not to decorate every element.
5. Keep the layout responsive on mobile and desktop.
6. Respect accessibility, loading and empty-state behavior from the quality gates.
7. Keep file upload + URL image strategy intact. Never use Base64 for pet photos.
8. If a section stays visually too similar to current code, refactor structure before polishing styles.

Expected output:

1. Pages with stronger storytelling and clearer vertical rhythm.
2. Hero, supporting sections and CTAs with a premium editorial feel.
3. Auth screens with a strong visual side and a clean form side.
4. Dashboard and error states with better hierarchy and polish.
5. Changes limited to the next implementation slice, with a short validation note.

Required delivery format:

1. File-by-file change summary, listing what was structurally changed.
2. Motion checklist by page (PASS/FAIL) against spec 20 minima.
3. Responsiveness checklist (mobile + desktop) with concise notes.
4. Accessibility checklist for focus, contrast and reduced-motion behavior.
5. Final verdict using spec 22 rubric: PASS, PASS COM RESSALVAS or FAIL.

Automatic rejection conditions:

1. Three or more target pages without structural change.
2. Missing motion implementation in any target page.
3. Cosmetic-only output (small spacing, color or border tweaks).
4. Reintroduction of Base64 image flow.

## Prompt Base End
