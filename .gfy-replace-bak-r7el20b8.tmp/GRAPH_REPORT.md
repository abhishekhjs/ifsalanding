# Graph Report - ifsa-nit-trichy  (2026-11-01)

## Corpus Check
- 181 files · ~255,716 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .ico 1, .css 1)

## Summary
- 306 nodes · 527 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Linting & Dependencies
- Next.js Config & API Routes
- Navigation & Hero Showcase
- About Page & Team Structure
- Base UI Primitives
- Publications & Page Routing
- Shadcn Component Aliases
- TypeScript Configuration
- Root Layout & Font System
- Achievements & Motion Animations
- Supabase & Remote Seeds
- Client Mandates & GSAP
- Marquee Partner Ticker
- Quality Gate Scripting
- Agent Idea Refine Script
- PostCSS Build Pipeline

## God Nodes (most connected - your core abstractions)
1. `next` - 28 edges
2. `react` - 19 edges
3. `compilerOptions` - 16 edges
4. `lucide-react` - 12 edges
5. `PartnerModal()` - 12 edges
6. `Database` - 12 edges
7. `cn` - 10 edges
8. `Breadcrumbs()` - 9 edges
9. `@base-ui/react` - 8 edges
10. `HomePage()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ClientsPageClient()` --calls--> `PartnerModal()`  [EXTRACTED]
  src/app/clients/clients-client.tsx → src/components/partner-modal.tsx
- `ClientsPage()` --calls--> `ClientsPageClient()`  [EXTRACTED]
  src/app/clients/page.tsx → src/app/clients/clients-client.tsx
- `EventsPageClient()` --calls--> `Breadcrumbs()`  [EXTRACTED]
  src/app/events/events-client.tsx → src/components/breadcrumbs.tsx
- `RootLayout()` --calls--> `NavBar()`  [EXTRACTED]
  src/app/layout.tsx → src/components/nav-bar.tsx
- `HomePage()` --calls--> `HomeAchievements()`  [EXTRACTED]
  src/app/page.tsx → src/components/home/achievements.tsx

## Import Cycles
- None detected.

## Communities (16 total, 4 thin omitted)

### Community 0 - "Linting & Dependencies"
Cohesion: 0.05
Nodes (46): eslintConfig, dependencies, class-variance-authority@^0.7.1, lenis@^1.3.26, lucide-react@^1.52.0, next@16.3.8, react@19.2.8, react-dom@19.2.8 (+38 more)

### Community 1 - "Next.js Config & API Routes"
Cohesion: 0.08
Nodes (26): nextConfig, next, InquiryInsert, Event, EventsPageClient(), TYPES, Event, EventsPage() (+18 more)

### Community 2 - "Navigation & Hero Showcase"
Cohesion: 0.10
Nodes (21): HomeHero(), LIVE_MANDATES, QUICK_STATS, NAV, NavBar(), LinkedInIcon(), PartnerModal(), Props (+13 more)

### Community 3 - "About Page & Team Structure"
Cohesion: 0.08
Nodes (29): AboutPageClient(), FAQ, TeamMember, VALUES, VERTICALS, AboutPage(), FAQ, metadata (+21 more)

### Community 4 - "Base UI Primitives"
Cohesion: 0.10
Nodes (6): @base-ui/react@^1.8.0, cn@^0.4.0, @base-ui/react, cn, Badge(), badgeVariants

### Community 5 - "Publications & Page Routing"
Cohesion: 0.19
Nodes (17): lucide-react, react, metadata, PublicationsPage(), CATS, PROCESS, PublicationsPageClient(), YEARS (+9 more)

### Community 6 - "Shadcn Component Aliases"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 7 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Root Layout & Font System"
Cohesion: 0.19
Nodes (10): dmSans, dmSerif, jetbrainsMono, metadata, RootLayout(), AnnouncementBar(), FOOT_COLS, Footer() (+2 more)

### Community 9 - "Achievements & Motion Animations"
Cohesion: 0.24
Nodes (9): motion@^14.0.0, motion, Achievement, CountUpNumber(), DotField(), HomeAchievements(), STRATEGIC_DOMAINS, WINNER_INDICES (+1 more)

### Community 10 - "Supabase & Remote Seeds"
Cohesion: 0.22
Nodes (7): @supabase/supabase-js@^2.117.2, @supabase/supabase-js, EVENTS, FAQS, PUBLICATIONS, supabase, TEAM_MEMBERS

### Community 11 - "Client Mandates & GSAP"
Cohesion: 0.25
Nodes (7): gsap@^3.15.0, gsap, CLIENT_PARTNERS, ClientPartner, CORPORATE_LOGOS, FILTER_TABS, MandateCategory

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Next.js Config & API Routes` to `Linting & Dependencies`, `Navigation & Hero Showcase`, `About Page & Team Structure`, `Publications & Page Routing`, `Root Layout & Font System`, `Client Mandates & GSAP`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Should `Linting & Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.053877551020408164 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Publications & Page Routing` to `Linting & Dependencies`, `Next.js Config & API Routes`, `Navigation & Hero Showcase`, `About Page & Team Structure`, `Base UI Primitives`, `Root Layout & Font System`, `Achievements & Motion Animations`, `Client Mandates & GSAP`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Should `Next.js Config & API Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.07822410147991543 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Publications & Page Routing` to `Linting & Dependencies`, `Navigation & Hero Showcase`, `About Page & Team Structure`, `Base UI Primitives`, `Achievements & Motion Animations`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `Navigation & Hero Showcase` be split into smaller, more focused modules?**
  _Cohesion score 0.0960960960960961 - nodes in this community are weakly interconnected._
- **Should `About Page & Team Structure` be split into smaller, more focused modules?**
  _Cohesion score 0.07899159663865546 - nodes in this community are weakly interconnected._