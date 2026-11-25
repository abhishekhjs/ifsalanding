---
trigger: always_on
description: Universal guideline restricting production builds and graphify updates to when genuinely necessary.
---

# Universal Build and Graphify Guideline

- **Do NOT run full production builds (`npm run build`, `next build`, etc.) or knowledge graph updates (`graphify update .`) for every small change, single component tweak, or minor visual edit.**
- Only run `build` and `graphify update` when:
  1. The user explicitly requests it (e.g. "build", "verify build", "update graphify").
  2. Delivering a finished major milestone or comprehensive multi-module refactor where an end-to-end check is genuinely necessary before completion.
- For incremental development and small tweaks, keep the workflow fast and responsive without launching long-running background tasks.
