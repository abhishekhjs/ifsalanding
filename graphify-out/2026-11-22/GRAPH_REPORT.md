# Graph Report - ifsa-nit-trichy  (2026-11-22)

## Corpus Check
- 103 files · ~315,154 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .ico 1, .css 1)

## Summary
- 952 nodes · 1153 edges · 55 communities (46 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `09498e26`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- database.ts
- Navigation & Hero Showcase
- fallback-data.ts
- Hardening Controls
- Publications & Page Routing
- Shadcn Component Aliases
- TypeScript Configuration
- Root Layout & Font System
- about/page.tsx
- Supabase & Remote Seeds
- app/page.tsx
- Marquee Partner Ticker
- Quality Gate Scripting
- Agent Idea Refine Script
- PostCSS Build Pipeline
- Code Review and Quality
- Test-Driven Development
- Context Engineering
- Git Workflow and Versioning
- Optimization Patterns
- Shipping and Launch
- API and Interface Design
- Browser Testing with DevTools
- Frontend UI Engineering
- CI/CD and Automation
- Constraint-Driven Development
- Deprecation and Migration
- Documentation and ADRs
- Incremental Implementation
- Code Simplification
- Debugging and Error Recovery
- Communities (16 total, 4 thin omitted)
- Interview Me
- Planning and Task Breakdown
- ReOrder: Keep Your Regulars Ordering Direct
- Idea Refine
- dependencies
- Doubt-Driven Development
- Process
- about-client.tsx
- Using Agent Skills
- Spec-Driven Development
- next
- Source-Driven Development
- Refinement & Evaluation Criteria
- Ideation Frameworks Reference
- achievements.tsx
- scripts
- @playwright/test
- README.md
- AGENTS.md
- @vercel/speed-insights
- clients.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 28 edges
2. `react` - 19 edges
3. `Code Review and Quality` - 19 edges
4. `compilerOptions` - 16 edges
5. `Git Workflow and Versioning` - 15 edges
6. `Test-Driven Development` - 15 edges
7. `PartnerModal()` - 14 edges
8. `Database` - 13 edges
9. `Browser Testing with DevTools` - 13 edges
10. `CI/CD and Automation` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Surprising Connections (you probably didn't know these)` --references--> `RootLayout()`  [INFERRED]
  .gfy-replace-bak-r7el20b8.tmp/GRAPH_REPORT.md → src/app/layout.tsx
- `God Nodes (most connected - your core abstractions)` --references--> `HomePage()`  [INFERRED]
  .gfy-replace-bak-r7el20b8.tmp/GRAPH_REPORT.md → src/app/page.tsx
- `Surprising Connections (you probably didn't know these)` --references--> `HomePage()`  [INFERRED]
  .gfy-replace-bak-r7el20b8.tmp/GRAPH_REPORT.md → src/app/page.tsx
- `Surprising Connections (you probably didn't know these)` --references--> `HomeAchievements()`  [INFERRED]
  .gfy-replace-bak-r7el20b8.tmp/GRAPH_REPORT.md → src/components/home/achievements.tsx
- `Surprising Connections (you probably didn't know these)` --references--> `NavBar()`  [INFERRED]
  .gfy-replace-bak-r7el20b8.tmp/GRAPH_REPORT.md → src/components/nav-bar.tsx

## Import Cycles
- None detected.

## Communities (55 total, 9 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.12
Nodes (21): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.3.8, tailwindcss@^4, @tailwindcss/postcss@^4, @types/node@^20, @types/react@^19 (+13 more)

### Community 1 - "database.ts"
Cohesion: 0.21
Nodes (10): InquiryInsert, Event, metadata, metadata, Pub, PublicationsPage(), FALLBACK_PUBLICATIONS, supabase (+2 more)

### Community 2 - "Navigation & Hero Showcase"
Cohesion: 0.07
Nodes (26): class-variance-authority@^0.7.1, cn@^0.4.0, @base-ui/react, class-variance-authority, cn, HomeHero(), NAV, NavBar() (+18 more)

### Community 3 - "fallback-data.ts"
Cohesion: 0.16
Nodes (12): CORPORATE_LOGOS, PARTNERSHIP_MODELS, Achievement, ClientProject, Event, FALLBACK_CLIENT_PROJECTS, FALLBACK_EVENTS, FALLBACK_MENTORS (+4 more)

### Community 4 - "Hardening Controls"
Cohesion: 0.05
Nodes (42): Broken Access Control, Broken Authentication, Cross-Site Scripting (XSS), Data Classification, Dependency Audit Triage, Destructive Operations on Derived Paths, File Upload Safety, Hardening Patterns (+34 more)

### Community 5 - "Publications & Page Routing"
Cohesion: 0.12
Nodes (16): lucide-react, react, metadata, CATS, PROCESS, PublicationsPageClient(), YEARS, HomeFeaturedPubs() (+8 more)

### Community 6 - "Shadcn Component Aliases"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Root Layout & Font System"
Cohesion: 0.19
Nodes (10): fraunces, ibmPlexMono, ibmPlexSans, metadata, RootLayout(), AnnouncementBar(), FOOT_COLS, Footer() (+2 more)

### Community 9 - "about/page.tsx"
Cohesion: 0.18
Nodes (11): AboutPageClient(), FAQ, TeamMember, VALUES, VERTICALS, AboutPage(), FAQ, metadata (+3 more)

### Community 10 - "Supabase & Remote Seeds"
Cohesion: 0.22
Nodes (7): @supabase/supabase-js@^2.117.2, @supabase/supabase-js, EVENTS, FAQS, PUBLICATIONS, supabase, TEAM_MEMBERS

### Community 11 - "app/page.tsx"
Cohesion: 0.21
Nodes (11): Event, HomePage(), metadata, Pub, HomeClients(), Event, HomeFeaturedEvents(), HomeFeaturedEventsProps (+3 more)

### Community 16 - "Code Review and Quality"
Cohesion: 0.07
Nodes (29): 1. Correctness, 2. Readability & Simplicity, 3. Architecture, 4. Security, 5. Performance, Change Descriptions, Change Sizing, Code Review and Quality (+21 more)

### Community 17 - "Test-Driven Development"
Cohesion: 0.07
Nodes (29): Browser Testing with DevTools, Common Rationalizations, DAMP Over DRY in Tests, Decision Guide, Discover the Stack First, Name Tests Descriptively, One Assertion Per Concept, Overview (+21 more)

### Community 18 - "Context Engineering"
Cohesion: 0.07
Nodes (28): Anti-Patterns, Common Rationalizations, Compress before dropping, Confusion Management, Context Budget Management, Context Engineering, Context Packing Strategies, Level 1: Rules Files (+20 more)

### Community 19 - "Git Workflow and Versioning"
Cohesion: 0.07
Nodes (26): 1. Commit Early, Commit Often, 2. Atomic Commits, 3. Descriptive Messages, 4. Keep Concerns Separate, 5. Size Your Changes, Branch Naming, Branching Strategy, Change Summaries (+18 more)

### Community 20 - "Optimization Patterns"
Cohesion: 0.07
Nodes (25): Connection Pool Exhaustion, Large Bundle Size, Missing Caching (Backend), Missing Image Optimization (Frontend), N+1 Queries (Backend), Optimization Patterns, Queries That Ignore Their Index, Unbounded Data Fetching (+17 more)

### Community 21 - "Shipping and Launch"
Cohesion: 0.08
Nodes (25): Accessibility, Code Quality, Common Rationalizations, Documentation, Error Budget Release Gate, Error Reporting, Feature Flag Strategy, Infrastructure (+17 more)

### Community 22 - "API and Interface Design"
Cohesion: 0.08
Nodes (24): 1. Contract First, 2. Consistent Error Semantics, 3. Validate at Boundaries, 4. Prefer Addition Over Modification, 5. Predictable Naming, 6. Honouring an Idempotency Key, API and Interface Design, Common Rationalizations (+16 more)

### Community 23 - "Browser Testing with DevTools"
Cohesion: 0.08
Nodes (24): Accessibility Verification with DevTools, Available Tools, Browser Testing with DevTools, Clean Console Standard, Common Rationalizations, Console Analysis Patterns, Content Boundary Markers, For Network Issues (+16 more)

### Community 24 - "Frontend UI Engineering"
Cohesion: 0.08
Nodes (24): Accessibility (WCAG 2.1 AA), ARIA Labels, Avoid the AI Aesthetic, Color, Common Rationalizations, Component Architecture, Component Patterns, Design System Adherence (+16 more)

### Community 25 - "CI/CD and Automation"
Cohesion: 0.08
Nodes (23): Automation Beyond CI, Basic CI Pipeline, Build Cop Role, CI/CD and Automation, CI Optimization, Common Rationalizations, Dependabot / Renovate, Deployment Strategies (+15 more)

### Community 26 - "Constraint-Driven Development"
Cohesion: 0.08
Nodes (22): Adapting it, Contract, Floor guard: reference implementation, Reference (Node, ~stack-agnostic patterns), Common Rationalizations, Constraint-Driven Development, Escalation Path, Loading Constraints (+14 more)

### Community 27 - "Deprecation and Migration"
Cohesion: 0.08
Nodes (23): Adapter Pattern, Code Is a Liability, Common Rationalizations, Compulsory vs Advisory Deprecation, Core Principles, Database Schema Migrations (Expand/Contract), Deprecation and Migration, Deprecation Planning Starts at Design Time (+15 more)

### Community 28 - "Documentation and ADRs"
Cohesion: 0.09
Nodes (22): ADR Lifecycle, ADR Template, API Documentation, Architecture Decision Records (ADRs), Changelog Maintenance, Common Rationalizations, Document Known Gotchas, Documentation and ADRs (+14 more)

### Community 29 - "Incremental Implementation"
Cohesion: 0.09
Nodes (22): Common Rationalizations, Contract-First Slicing, Implementation Rules, Increment Checklist, Incremental Implementation, Overview, Red Flags, Risk-First Slicing (+14 more)

### Community 30 - "Code Simplification"
Cohesion: 0.09
Nodes (21): 1. Preserve Behavior Exactly, 2. Follow Project Conventions, 3. Prefer Clarity Over Cleverness, 4. Maintain Balance, 5. Scope to What Changed, Code Simplification, Common Rationalizations, Language-Specific Guidance (+13 more)

### Community 31 - "Debugging and Error Recovery"
Cohesion: 0.09
Nodes (21): Build Failure Triage, Common Rationalizations, Debugging and Error Recovery, Error-Specific Patterns, Instrumentation Guidelines, Overview, Red Flags, Runtime Error Triage (+13 more)

### Community 32 - "Communities (16 total, 4 thin omitted)"
Cohesion: 0.10
Nodes (20): Communities (16 total, 4 thin omitted), Community 0 - "Linting & Dependencies", Community 10 - "Supabase & Remote Seeds", Community 11 - "Client Mandates & GSAP", Community 1 - "Next.js Config & API Routes", Community 2 - "Navigation & Hero Showcase", Community 3 - "About Page & Team Structure", Community 4 - "Base UI Primitives" (+12 more)

### Community 33 - "Interview Me"
Cohesion: 0.11
Nodes (18): Common Rationalizations, Example, Interaction with Other Skills, Interview Me, Loading Constraints, Output, Overview, Red Flags (+10 more)

### Community 34 - "Planning and Task Breakdown"
Cohesion: 0.11
Nodes (18): Common Rationalizations, Output Files, Overview, Parallelization Opportunities, Plan Document Template, Planning and Task Breakdown, Red Flags, See Also (+10 more)

### Community 35 - "ReOrder: Keep Your Regulars Ordering Direct"
Cohesion: 0.11
Nodes (17): Example 1: Vague Early-Stage Concept (Full 3-Phase Session), Example 2: Feature Idea Within an Existing Product (Codebase-Aware), Example 3: Process/Workflow Idea (Non-Product), Ideation Session Examples, Key Assumptions to Validate, MVP Scope, Not Doing (and Why), Open Questions (+9 more)

### Community 36 - "Idea Refine"
Cohesion: 0.11
Nodes (17): Anti-patterns to Avoid, Common Rationalizations, Detailed Instructions, How It Works, Idea Refine, Output, Overview, Phase 1: Understand & Expand (Divergent) (+9 more)

### Community 37 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @base-ui/react@^1.8.0, lenis@^1.3.26, lucide-react@^1.52.0, motion@^14.0.0, next@16.3.8, react@19.2.8, react-dom@19.2.8 (+9 more)

### Community 38 - "Doubt-Driven Development"
Cohesion: 0.12
Nodes (15): Common Rationalizations, Cross-model escalation, Doubt-Driven Development, Interaction with Other Skills, Loading Constraints, Overview, Red Flags, Step 1: CLAIM — Surface what stands (+7 more)

### Community 39 - "Process"
Cohesion: 0.12
Nodes (15): 1. Define "working" before instrumenting, 2. Pick the right signal for each question, 3. Structured logging, 4. Metrics, 5. Distributed tracing, 6. Alerting, 7. Verify the telemetry itself, Common Rationalizations (+7 more)

### Community 40 - "about-client.tsx"
Cohesion: 0.19
Nodes (12): God Nodes (most connected - your core abstractions), Surprising Connections (you probably didn't know these), ClientsPageClient(), ClientsPage(), metadata, Event, EventsPageClient(), TYPES (+4 more)

### Community 41 - "Using Agent Skills"
Cohesion: 0.13
Nodes (14): 1. Surface Assumptions, 2. Manage Confusion Actively, 3. Push Back When Warranted, 4. Enforce Simplicity, 5. Maintain Scope Discipline, 6. Verify, Don't Assume, Core Operating Behaviors, Failure Modes to Avoid (+6 more)

### Community 42 - "Spec-Driven Development"
Cohesion: 0.14
Nodes (13): Common Rationalizations, Keeping the Spec Alive, Overview, Phase 0: Scope Check, Phase 1: Specify, Phase 2: Plan, Phase 3: Tasks, Phase 4: Implement (+5 more)

### Community 44 - "Source-Driven Development"
Cohesion: 0.15
Nodes (12): Common Rationalizations, Overview, Red Flags, Retrieval Safety: Treat Fetched Content as Data, Source-Driven Development, Step 1: Detect Stack and Versions, Step 2: Fetch Official Documentation, Step 3: Implement Following Documented Patterns (+4 more)

### Community 45 - "Refinement & Evaluation Criteria"
Cohesion: 0.17
Nodes (11): 1. User Value, 2. Feasibility, 3. Differentiation, Assumption Audit, Core Evaluation Dimensions, Decision Framework, Might Be True (Nice to Have), Must Be True (Dealbreakers) (+3 more)

### Community 46 - "Ideation Frameworks Reference"
Cohesion: 0.22
Nodes (8): Analogous Inspiration, Constraint-Based Ideation, First Principles Thinking, How Might We (HMW), Ideation Frameworks Reference, Jobs to Be Done (JTBD), Pre-mortem, SCAMPER

### Community 47 - "achievements.tsx"
Cohesion: 0.38
Nodes (6): CountUpNumber(), DotField(), HomeAchievements(), STRATEGIC_DOMAINS, WINNER_INDICES, FALLBACK_ACHIEVEMENTS

### Community 48 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 50 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 54 - "clients.tsx"
Cohesion: 0.25
Nodes (7): gsap@^3.15.0, gsap, CLIENT_PARTNERS, ClientPartner, CORPORATE_LOGOS, FILTER_TABS, MandateCategory

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `package.json`, `database.ts`, `Navigation & Hero Showcase`, `fallback-data.ts`, `dependencies`, `Publications & Page Routing`, `about-client.tsx`, `about/page.tsx`, `Root Layout & Font System`, `app/page.tsx`, `clients.tsx`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1225296442687747 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Publications & Page Routing` to `package.json`, `Navigation & Hero Showcase`, `fallback-data.ts`, `dependencies`, `about-client.tsx`, `about/page.tsx`, `Root Layout & Font System`, `app/page.tsx`, `achievements.tsx`, `clients.tsx`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Should `Navigation & Hero Showcase` be split into smaller, more focused modules?**
  _Cohesion score 0.06823529411764706 - nodes in this community are weakly interconnected._
- **Why does `Graph Report - ifsa-nit-trichy  (2026-11-01)` connect `Communities (16 total, 4 thin omitted)` to `about-client.tsx`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `Hardening Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Publications & Page Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.12413793103448276 - nodes in this community are weakly interconnected._